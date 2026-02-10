<template>
  <nav class="navbar">
    <div class="brand">
      <img src="/icon.png" alt="DayByDay" />
      <span>DayByDay</span>
    </div>

   <div class="nav-links">
  <template v-if="auth.isLoggedIn()">
    <NuxtLink
      to="/dashboard"
      class="nav-btn primary"
    >
      Dashboard
    </NuxtLink>

    <NuxtLink
      to="#"
      class="nav-btn danger"
      @click.prevent="handleLogout"
    >
      Logout
    </NuxtLink>
  </template>

  <template v-else>
    <NuxtLink to="/login" class="nav-btn secondary">Login</NuxtLink>
    <NuxtLink to="/register" class="nav-btn primary">Sign Up</NuxtLink>
  </template>
</div>

  </nav>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

onMounted(() => {
  auth.fetchUser()
})

const handleLogout = async () => {
  await auth.logout()
  navigateTo('/') 
}
</script>

<style scoped>
/* ---------------- NAVBAR BASE ---------------- */
.navbar {
  height: 64px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, #181a95, #8b5cf6);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  gap: 1rem;
}

/* ---------------- BRAND ---------------- */
.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 500;
  color: #e7d6c4;
  white-space: nowrap;
}

.brand img {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
}

/* ---------------- NAV LINKS ---------------- */
.nav-links {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap; /* ✅ prevents overlap */
}

/* ---------------- BUTTONS ---------------- */
.nav-btn {
  padding: 10px 22px;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s ease;
}

/* Primary */
.nav-btn.primary {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 6px 18px rgba(99, 102, 241, 0.35);
}

.nav-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.45);
}

/* Secondary */
.nav-btn.secondary {
  background: white;
  color: #6366f1;
  border: 1px solid #e5e7eb;
}

.nav-btn.secondary:hover {
  background: #eef2ff;
  transform: translateY(-1px);
}

/* Danger */
.nav-btn.danger {
  background: linear-gradient(90deg, #ef4444, #dc2626);
  color: white;
  box-shadow: 0 6px 18px rgba(239, 68, 68, 0.35);
}

.nav-btn.danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(239, 68, 68, 0.45);
}

/* ---------------- MOBILE RESPONSIVE ---------------- */
@media (max-width: 768px) {
  .navbar {
    height: auto;
    padding: 1rem;
    flex-direction: column;
    align-items: stretch;
  }

  .brand {
    justify-content: center;
    font-size: 1.4rem;
  }

  .brand img {
    height: 40px;
    width: 40px;
  }

  .nav-links {
    justify-content: center;
    gap: 8px;
  }

  .nav-btn {
    padding: 8px 14px;
    font-size: 0.85rem;
    border-radius: 10px;
  }
}


</style>
