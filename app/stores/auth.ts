import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null)
  const isReady = ref(false)

  const restoreUser = () => {
    if (process.client) {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        user.value = JSON.parse(savedUser)
      }
    }
    isReady.value = true
  }

  const fetchUser = async () => {
    try {
      const data = await $fetch('/api/auth/me', {
        credentials: 'include'
      })
      user.value = data
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(data))
      }
    } catch {
      user.value = null
      if (process.client) {
        localStorage.removeItem('user')
      }
    } finally {
      isReady.value = true
    }
  }

  const isLoggedIn = () => !!user.value

  const logout = async () => {
    await $fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
    user.value = null
    if (process.client) {
      localStorage.removeItem('user')
    }
  }

  return {
    user,
    isReady,
    restoreUser,
    fetchUser,
    isLoggedIn,
    logout
  }
})
