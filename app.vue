<template>
  <div class="app-container">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
/* Global CSS variables and base styles stay here */
:root {
  --primary: #ff6b35;
  --secondary: #004e64;
  --background: #ffffff;
  --surface: #f8fafc;
  --text: #1a202c;
  --text-light: #718096;
  --white: #ffffff;
  --glass: rgba(255, 255, 255, 0.8);
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius: 16px;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--background);
  line-height: 1.6;
  overflow-x: hidden;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-padding {
  padding: 100px 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: var(--primary);
  color: var(--white);
  box-shadow: 0 4px 14px 0 rgba(255, 107, 53, 0.39);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.23);
  opacity: 0.9;
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-underline {
  width: 60px;
  height: 4px;
  background: var(--primary);
  border-radius: 2px;
}

.glass-morphism {
  background: var(--glass);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
