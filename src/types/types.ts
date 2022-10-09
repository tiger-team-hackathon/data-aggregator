export interface Data {
    source: string
    id: string
    title: string
    subtitle: string
    content: string
    date: Date
    tags: string[]
}

export type DataGetterOptions = {
    limit: number
}

export type DataGetter = (options: DataGetterOptions, ...args: any) => AsyncGenerator<Data>