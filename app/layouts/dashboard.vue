<template>
  <div class="dashboard-layout">
    <Navbar/>

    <main class="dashboard-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
}

.dashboard-topbar {
  height: 72px;
  padding: 0 32px;
  background: #020617;
  color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar-left img {
  width: 36px;
  height: 36px;
  border-radius: 10px;
}

.topbar-left h3 {
  margin: 0;
  font-weight: 600;
}


.dashboard-content {
  padding: 40px;
}

</style>
