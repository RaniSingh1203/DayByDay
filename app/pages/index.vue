<template>
  <div class="home">
   
    <section class="hero">
      <h1 class="title">DayByDay</h1>
      <p class="subtitle">
        Capture your thoughts. Save your memories.  
        One day at a time.
      </p>

      <div class="actions">
        <NuxtLink to="/register" class="btn primary">Get Started</NuxtLink>
        <NuxtLink to="login" class="btn secondary">Login</NuxtLink>
      </div>
    </section>

   
    <section class="features">
      <div class="feature-card">
        <div class="icon">📝</div>
        <h3>Daily Journals</h3>
        <p>Write your thoughts every day and keep them safe forever.</p>
      </div>

      <div class="feature-card">
        <div class="icon">📸</div>
        <h3>Multiple Photos</h3>
        <p>Upload more than one image to capture moments visually.</p>
      </div>

      <div class="feature-card">
        <div class="icon">📖</div>
        <h3>View Anytime</h3>
        <p>Read your journals whenever you want, from any device.</p>
      </div>
    </section>

   
    <footer class="footer">
      © {{ new Date().getFullYear() }} DayByDay • Your personal diary
    </footer>
  </div>
</template>

<style scoped>

.home {
  min-height: 100vh;
  background: linear-gradient(180deg, #eef2ff, #f8fafc);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 20px;
  font-family: "Inter", sans-serif;
}


.hero {
  text-align: center;
  max-width: 700px;
  margin-bottom: 80px;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 1.2rem;
  color: #4b5563;
  margin-bottom: 32px;
}


.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 28px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.primary {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.35);
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.45);
}

.secondary {
  background: white;
  color: #6366f1;
  border: 1px solid #e5e7eb;
}

.secondary:hover {
  background: #eef2ff;
}


.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1000px;
  width: 100%;
  margin-bottom: 80px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 1rem;
  color: #6b7280;
}


.footer {
  color: #9ca3af;
  font-size: 0.9rem;
  text-align: center;
}
</style>

