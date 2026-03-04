<template>
  <nav class="navbar glass-morphism">
    <div class="container navbar-content">
      <NuxtLink to="/" class="logo">
        <span class="logo-text">Excellent</span>
        <span class="logo-accent">Cuizine</span>
      </NuxtLink>

      <ul class="nav-links">
        <li><a href="#products">Products</a></li>
        <li><a href="#booking">Book Order</a></li>
        <li><a href="#consultancy">Consultancy</a></li>
      </ul>

      <div class="nav-actions">
        <a href="#booking" class="btn btn-primary">Book Now</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  display: flex;
  align-items: center;
  transition: var(--transition);
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  gap: 0.2rem;
}

.logo-text {
  color: var(--secondary);
}

.logo-accent {
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-links a {
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: var(--transition);
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-links a:hover::after {
  width: 100%;
}

@media (max-width: 768px) {

  .nav-links,
  .nav-actions {
    display: none;
  }
}
</style>
