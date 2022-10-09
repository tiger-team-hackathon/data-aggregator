<template>
  <div class="main">
    <router-link class="main__link" to="cbr">CBR</router-link>
    <router-link class="main__link" to="consultant">Consultant</router-link>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const count = ref(0)
</script>

<style lang="scss" scoped>

</style>
