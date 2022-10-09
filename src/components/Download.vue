<template>
  <a :href="downloadLink" download="data.json" @click="get">Download</a>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const get = () => {
  // const blob = new Blob([props.text], {type: 'text/plain'})
  console.log(props.text)
}

const downloadLink = computed(() => {

  return `data:text/plain;charset=utf-8,${encodeURIComponent(props.text)}`
})
</script>

<style lang="scss" scoped>

</style>
