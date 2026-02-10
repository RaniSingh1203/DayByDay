<script setup lang="ts">
const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })
    navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <img src="/logo.png" class="logo" alt="DayByDay" />

      <h2>Welcome back</h2>
      <p class="subtitle">Log in to continue your journey</p>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="primary-btn" :disabled="loading">
          {{ loading ? 'Logging in…' : 'Login' }}
        </button>
      </form>

      <p class="footer-text">
        Don’t have an account?
        <NuxtLink to="/register">Sign up</NuxtLink>
      </p>
    </div>
  </div>
</template>
