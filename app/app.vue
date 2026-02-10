<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
onMounted(() => {
  auth.restoreUser()
  auth.fetchUser()
})

</script>
