<script setup lang="ts">
import {ref,reactive} from 'vue'
const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: form
    })
    navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err?.data?.statusMessage || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    
    <div class="card">
      <img src="/logo.png" class="logo" alt="Logo" />

      <h2>Create your account</h2>

      <form @submit.prevent="submit">
        <div class="field">
          <label>Name</label>
          <input v-model="form.name" />
        </div>

        <div class="field">
          <label>Email</label>
          <input v-model="form.email" type="email" />
        </div>

        <div class="field">
          <label>Password</label>
          <input v-model="form.password" type="password" />
        </div>

        <div class="field">
          <label>Confirm Password</label>
          <input v-model="form.confirmPassword" type="password" />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="primary-btn" :disabled="loading">
          {{ loading ? 'Registering…' : 'Sign Up' }}
        </button>
      </form>
        <p class="footer-text">
        Already Signed Up?
        <NuxtLink to="/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>


