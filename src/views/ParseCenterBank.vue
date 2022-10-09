<template>
  <p>
    <download :text="text"/>
    {{ cards.length }}
  </p>
  <n-card v-for="item in cards" :key="item.title" :title="item.title">
    <p>
      {{ item.subtitle }}
    </p>
    <p>
      {{ item.content }}
    </p>
  </n-card>
</template>

<script lang="ts" setup>
import {NCard, useMessage} from 'naive-ui'
import Download from "../components/Download.vue";
import {computed, onMounted, ref} from 'vue'
import {Data} from "@/types/types";


interface Doc {
  name_doc: string
  DT: string
  dateupdate: string
  doc_htm: number
}

const cards = ref<Data[]>([])

const text = computed(() => JSON.stringify(cards.value, null, 2))

const message = useMessage()

onMounted(async () => {
  console.log('mounted')


  for (let i = 0; i < 1000; i++) {
    const docs: Doc[] = await fetch(`/cbr/Queries/AjaxDataSource/80028?page=${i}&IsEng=false&type=0&_=1665166775735`)
        .then(res => res.json())

    for (let j = 0; j < docs.length; j++) {
      const html = await fetch(`/cbr/press/event/?id=${docs[j].doc_htm}`)
          .then(response => response.text())

      const el = document.createElement('html');
      el.innerHTML = html;

      // const title = el.querySelector("#content > div > div > div > div > h1 > span")
      const subtitle = el.querySelector("#content > div > div > div > div > div.lead-text")
      const content = el.querySelector("#content > div > div > div > div > div.landing-text")

      cards.value.push({
        source: 'cbr',
        id: `${docs[j].doc_htm}`,
        title: docs[j].name_doc?.replace(/\u00a0/g, " "),
        subtitle: subtitle?.textContent?.replace(/\u00a0/g, " ") || '',
        content: content?.textContent?.replace(/\u00a0/g, " ") || '',
        date: new Date(docs[i].dateupdate),
        tags: []
      })
    }
  }


  message.success('done')
  console.log("END")
})
</script>

<style lang="scss" scoped>

</style>
