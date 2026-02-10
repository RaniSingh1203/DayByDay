<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const user = ref<any>(null)
const todayJournal = ref<any>(null)
const journals = ref<any[]>([])
const loading = ref(true)
const saving = ref(false)

const loadData = async () => {
  todayJournal.value = await $fetch('/api/journals/today')
  journals.value = await $fetch('/api/journals/list')
}

onMounted(async () => {
  try {
    user.value = await $fetch('/api/auth/me')
    await loadData()
  } finally {
    loading.value = false
  }
})
function goToToday() {
  navigateTo('/today')
}

</script>
<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-topbar">
      <span v-if="user" class="welcome">Hi, {{ user.name }}</span>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-else class="dashboard-home">
      <!-- TODAY ROW -->
      <div class="today-row">
        <!-- TODAY CARD -->
        <div
          class="card accent today-card"
          :class="{ clickable: !todayJournal }"
          @click="!todayJournal && goToToday()"
        >
          <div class="card-header">
            <h4>Today</h4>

            <button
              v-if="todayJournal"
              class="view-btn"
              @click.stop="navigateTo('/today')"
            >
              View
            </button>
          </div>

          <!-- CONTENT -->
          <div v-if="todayJournal">
            <p class="today-content">
              {{ todayJournal.content }}
            </p>
          </div>

          <div v-else>
            <p class="muted">You haven’t written today yet.</p>
            <p class="muted">Click to write today’s entry ✍️</p>
          </div>

          <!-- IMAGES -->
          <div
            v-if="todayJournal?.images?.length"
            class="today-images"
          >
            <div
              v-for="img in todayJournal.images.slice(0, 3)"
              :key="img.id"
              class="today-img-box"
            >
              <img :src="img.image_url" />
            </div>

            <span
              v-if="todayJournal.images.length > 3"
              class="more"
            >
              +{{ todayJournal.images.length - 3 }}
            </span>
          </div>
        </div>

        <!-- STREAK -->
        <div class="streak-circle">
          <span class="streak-number">{{ journals.length }}</span>
          <span class="streak-label">day streak</span>
        </div>
      </div>

      
      <div class="journals-section">
        <h3>All Your Journals</h3>

        <div class="journals-grid">
          <div
            v-for="j in journals"
            :key="j.id"
            class="journal-mini-card"
            @click="navigateTo(`/journals/${j.id}`)"
          >
            <span class="journal-date">
              {{ new Date(j.created_at).toDateString() }}
            </span>

            <p class="journal-snippet">
              {{ j.content.slice(0, 80) }}...
            </p>

            <div v-if="j.images?.length" class="mini-images">
              <img :src="j.images[0].image_url" />
              <span
                v-if="j.images.length > 1"
                class="more-mini"
              >
                +{{ j.images.length - 1 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dashboard-home {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}


.card {
  background: #ffffff;
  padding: 26px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.12);
}

.card h4 {
  margin-bottom: 8px;
  color: #020617;
}

.card p {
  color: #475569;
  line-height: 1.6;
}


.card.accent {
  border-left: 6px solid #14b8a6;
  background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%);
}


.welcome {
  margin-right: 16px;
  color: #14b8a6;
  font-size: 34px;
  font-family: "AmstelvarAlpha";
  font-style: normal;
}

.today-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
  
}


.today-images img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.today-images img:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.15);
}


.today-images .more {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  background: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
}
.today-row {
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 400px;
  align-items: center;
}

.streak-circle {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle at top, #14b8a6, #0f766e);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0 14px 40px rgba(20, 184, 166, 0.35);
}

.streak-number {
  font-size: 42px;
  font-weight: 700;
}

.streak-label {
  font-size: 14px;
  opacity: 0.9;
}
.journals-section {
  grid-column: 1 / -1;
}

.journals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 18px;
}

.journal-mini-card {
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.journal-mini-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(2, 6, 23, 0.12);
}

.journal-date {
  font-size: 12px;
  color: #64748b;
}

.journal-snippet {
  margin-top: 8px;
  font-size: 14px;
  color: #334155;
  white-space: pre-wrap;
  line-height: 1.6;
}

.mini-images {
  margin-top: 10px;
  position: relative;
}

.mini-images img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
}

.more-mini {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
}
.edit-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-top: 6px;
}

.edit-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.edit-actions button {
  background: #14b8a6;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
}

.today-img-box {
  position: relative;
}

.delete-img {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.view-btn,
.edit-btn {
  background: #0f766e;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  cursor: pointer;
}

.edit-btn {
  background: #14b8a6;
}
@media (max-width: 768px) {
  .dashboard-layout {
    flex-direction: column;
  }
}

</style>