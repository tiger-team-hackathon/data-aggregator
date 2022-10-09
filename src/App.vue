<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider :max="3" placement="bottom-right">
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import {NDialogProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider} from 'naive-ui'</script>

<style lang="scss" scoped>

</style>
