<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

const journal = ref<any>(null)
const loading = ref(true)
const error = ref('')

const journalId = Number(route.params.id)
console.log('Journal ID:', journalId)

if (isNaN(journalId) || journalId <= 0) {
  error.value = 'Invalid journal ID'
  loading.value = false
}


const loadJournal = async () => {
  if (error.value) return

  loading.value = true
  error.value = ''

  try {
   
    journal.value = await $fetch(`/api/journals/${journalId}`)
  } catch (err: any) {
   
    if (err?.data?.statusCode === 400) {
      error.value = 'Invalid journal ID'
    } else if (err?.data?.statusCode === 404) {
      error.value = 'Journal not found'
    } else if (err?.data?.statusCode === 401) {
      error.value = 'Unauthorized. Please login.'
    } else {
      error.value = 'Failed to load journal. Please try again.'
    }
    journal.value = null
  } finally {
    loading.value = false
  }
}


onMounted(() => {
  loadJournal()
})

const goBack = () => router.push('/dashboard')
</script>

<template>
  <div class="journal-wrapper">
   
    <div v-if="loading" class="loading">Loading journal...</div>

   
    <div v-else-if="error" class="error">
      {{ error }}
      <button class="primary-btn" @click="goBack">
        Go Back
      </button>
    </div>

  
    <div v-else class="journal-card">
      <h2 class="title">Journal Entry</h2>
      <br>
       <p class="date">Created On: {{ new Date(journal.created_at).toDateString()  }}</p>
       <br>
      <p class="content">{{ journal.content }}</p>

  
      <div v-if="journal.images?.length" class="images">
        <div v-for="img in journal.images" :key="img.id" class="image-box">
          <img :src="img.image_url" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.journal-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 60px 16px;
  font-family: "Inter", sans-serif;
}

.journal-card {
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
}

.title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 20px;
   color:#8b5cf6
}

.content {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
  line-height: 1.6;
  font-family:'Times New Roman', Times, serif;
 
}
.date{
  font-size: 24px;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-wrap;
  line-height: 1.6;
  font-family: 'Times New Roman', Times, serif;
  color: #8a5cf6c4;
 
}
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.images img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 16px;
}

.loading, .error {
  text-align: center;
  font-size: 1.1rem;
  color: #374151;
}

.primary-btn {
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: 700;
  cursor: pointer;
}
</style>
