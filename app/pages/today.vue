<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

import { ref, onMounted } from 'vue'

const journal = ref<any>(null)
const content = ref('')
const images = ref<File[]>([])
const editImages = ref<File[]>([])

const saving = ref(false)
const loading = ref(true)
const editing = ref(false)
const editContent = ref('')

/* 🔥 image preview state */
const previewImage = ref<string | null>(null)

const openPreview = (src: string) => {
  previewImage.value = src
}

const closePreview = () => {
  previewImage.value = null
}

const loadToday = async () => {
  journal.value = await $fetch('/api/journals/today', {
    credentials: 'include'
  })

  if (journal.value) {
    content.value = journal.value.content
  }
}

onMounted(async () => {
  try {
    await loadToday()
  } finally {
    loading.value = false
  }
})

const onImageChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) images.value.push(...Array.from(files))
}

const onEditImageChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files) editImages.value.push(...Array.from(files))
}

const saveJournal = async () => {
  if (!content.value.trim()) return

  saving.value = true
  try {
    const formData = new FormData()
    formData.append('content', content.value)

    images.value.forEach(img => {
      formData.append('images', img)
    })

    await $fetch('/api/journals/create', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })

    navigateTo('/dashboard')
  } finally {
    saving.value = false
  }
}

const startEdit = () => {
  editContent.value = journal.value.content
  editing.value = true
}

const saveEdit = async () => {
  if (!editContent.value.trim() && !editImages.value.length) return

  saving.value = true
  try {
    const formData = new FormData()
    formData.append('content', editContent.value)

    editImages.value.forEach(img => {
      formData.append('images', img)
    })

    await $fetch('/api/journals/today', {
      method: 'PUT',
      body: formData,
      credentials: 'include'
    })

    editImages.value = []
    editing.value = false
    await loadToday()
    navigateTo('/dashboard')
  } finally {
    saving.value = false
  }
}

const deleteImage = async (id: number) => {
  await $fetch(`/api/journals/image/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  journal.value.images =
    journal.value.images.filter((i: any) => i.id !== id)
}
</script>
<template>
  <div class="journal-wrapper">
    <div class="journal-card">
      <h2 class="title">Today’s Journal</h2>

      <div v-if="loading" class="loading">
        Loading your journal...
      </div>

      <div v-else-if="journal">
        <p v-if="!editing" class="content">
          {{ journal.content }}
        </p>

        <div v-else>
          <textarea v-model="editContent" class="input" />

          <label class="file-input-label">
            <input type="file" multiple accept="image/*" @change="onEditImageChange" />
            📸 Add Images
          </label>

          <button class="primary-btn" @click="saveEdit" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>

        <!-- IMAGES -->
        <div class="images" v-if="journal.images?.length">
          <div
            v-for="img in journal.images"
            :key="img.id"
            class="image-box"
          >
            <img
              :src="img.image_url"
              @click="openPreview(img.image_url)"
            />
            <button
              class="delete-img"
              @click.stop="deleteImage(img.id)"
            >
              ×
            </button>
          </div>
        </div>

        <button
          v-if="!editing"
          class="primary-btn"
          style="margin-top:16px"
          @click="startEdit"
        >
          Edit
        </button>
      </div>

      <!-- CREATE -->
      <div v-else>
        <textarea
          v-model="content"
          placeholder="Write about your day..."
          class="input"
        />

        <label class="file-input-label">
          <input type="file" multiple accept="image/*" @change="onImageChange" />
          📸 Add Images
        </label>

        <div class="preview-images" v-if="images.length">
          <p>Selected images</p>
          <div class="preview-grid">
            <img
              v-for="(img, index) in images"
              :key="index"
              :src="URL.createObjectURL(img)"
            />
          </div>
        </div>

        <button
          class="primary-btn"
          :disabled="saving"
          @click="saveJournal"
        >
          {{ saving ? 'Saving...' : 'Save Journal' }}
        </button>
      </div>
    </div>
 

  <!-- 🔥 FULLSCREEN IMAGE PREVIEW -->
  <div
    v-if="previewImage"
    class="image-preview-overlay"
    @click.self="closePreview"
  >
    <button class="close-btn" @click="closePreview">✕</button>
    <img :src="previewImage" class="preview-image" />
  </div></div>
</template>



<style scoped>

.journal-wrapper {
  min-height: 100vh;
  background: linear-gradient(180deg, #eef2ff, #f8fafc);
  display: flex;
  justify-content: center;
  padding: 60px 16px;
  font-family: "Inter", sans-serif;
}

.journal-card {
  width: 100%;
  max-width: 720px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

.title {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}


.loading {
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
}


.input {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: all 0.3s ease;
  white-space: pre-wrap;
  line-height: 1.6;
  
}

.input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}


.file-input-label {
  display: inline-block;
  margin-top: 16px;
  padding: 12px 22px;
  border-radius: 999px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
  transition: all 0.3s ease;
}

.file-input-label:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.45);
}

.file-input-label input {
  display: none;
}


.preview-images {
  margin-top: 20px;
}

.preview-images p {
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
}

.preview-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preview-grid img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}


.images {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.image-box {
  position: relative;
}

.images img {
  width: 130px;
  height: 130px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.images img:hover {
  transform: scale(1.05);
}


.delete-img {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.65);
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.delete-img:hover {
  background: #ef4444;
}


.content {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 16px;
}


.edit-actions {
  margin-top: 16px;
}


.primary-btn {
  margin-top: 24px;
  padding: 14px 32px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
  transition: all 0.3s ease;
  
}
.primary-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.45);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
/* ---------- FULLSCREEN IMAGE PREVIEW ---------- */

.image-preview-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 20px;
  cursor: pointer;
}


</style>
