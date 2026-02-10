export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  if (!auth.isReady) return

  if (!auth.user) {
    return navigateTo('/login')
  }
})
