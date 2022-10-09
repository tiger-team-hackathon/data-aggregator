import {Data, DataGetter, DataGetterOptions} from "@/types/types";

type ConsultantConfig = {
    params: string
    filter?: (data: Data) => boolean
}

interface DataContainerSummary {
    data: DocSummary[]
}

interface DocSummary {
    type: 'news' | string,
    id: string
    attributes: AttributesSummary,
}


interface AttributesSummary {
    title: string
    descr: string
    newsType: string
    publishedAt: string,
}

interface DataContainer {
    data: Doc
}

interface Doc {
    id: string
    attributes: Attributes,
}


interface Attributes {
    title: string
    content: string
    newsType: string
    publishedAt: string,
    ga: { tags: string }
}

const getFromConsultant = (consultant: ConsultantConfig): DataGetter => {
    async function* func(options: DataGetterOptions) {
        let cnt = 0;
        let page = 1;
        while (cnt <= options.limit) {

            const container: DataContainerSummary = await fetch(`/consultant/legalnews/api/news/?page[number]=${page++}&page[size]=20&&${consultant.params}`)
                .then(res => res.json())

            for (let j = 0; j < container.data.length; j++) {
                const curr = container.data[j]

                const json: DataContainer = await fetch(`/consultant/legalnews/api/news/${curr.id}/`)
                    .then(response => response.json())

                const doc = json.data

                const el = document.createElement('div');
                el.innerHTML = doc.attributes.content;

                const data: Data = {
                    source: 'consultant',
                    id: `${doc.id}`,
                    title: curr.attributes.title,
                    subtitle: curr.attributes.descr,
                    content: el.textContent || '',
                    date: new Date(curr.attributes.publishedAt),
                    tags: [...new Set(doc.attributes.ga.tags.split('|'))]
                }

                if (options.limit <= cnt++) {
                    break
                }

                if (consultant.filter && !consultant.filter(data)) {
                    console.log('filtered', data)
                    continue
                }
                yield data


            }
        }
    }

    return func
}

export default getFromConsultant