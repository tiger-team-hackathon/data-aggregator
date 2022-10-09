<template>
  <div>
    <download :text="text"/>
    <div>all: {{ cards.length }}</div>
    <div>others: {{ others.length }}</div>
    <div>accountant: {{ accountant.length }}</div>
  </div>
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
import {computed, onMounted} from 'vue'
import {Data} from "@/types/types";
import {NCard, useMessage} from "naive-ui";
import Download from "@/components/Download.vue";
import getFromConsultant from "@/parse/consultant";
import {until, useLocalStorage} from "@vueuse/core";

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

const accountant = useLocalStorage<Data[]>('consultan.accountant', [])
const others = useLocalStorage<Data[]>('consultan.others', [])
const cards = computed(() => [...accountant.value, ...others.value])


const text = computed(() => JSON.stringify(cards.value, null, 2))

const message = useMessage()

const accountantParams = 'enabledScopeIds[]=1&enabledScopeIds[]=4'
const othersParams = 'enabledScopeIds[]=2&enabledScopeIds[]=3&enabledScopeIds[]=5&enabledScopeIds[]=38'

onMounted(async () => {
  message.info('mounted')

  const accountantGen = getFromConsultant({params: accountantParams})

  if (accountant.value.length < 1000) {
    for await (const item of accountantGen({limit: 1000})) {
      accountant.value.push(item)

      if (accountant.value.length >= 1000) {
        break
      }
    }
  }

  await until(accountant).toMatch((value) => value.length >= 1000)

  const othersGen = getFromConsultant({
    params: othersParams,
    filter: (item) => !accountant.value.map(i => i.id).includes(item.id)
  })


  if (others.value.length < 1000) {
    for await (const item of othersGen({limit: 1000})) {
      others.value.push(item)

      if (others.value.length >= 1000) {
        break
      }
    }
  }

  message.success('done')
})
</script>

<style lang="scss" scoped>

</style>
