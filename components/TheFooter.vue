<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-info">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">Excellent</span>
          <span class="logo-accent">Cuizine</span>
        </NuxtLink>
        <p class="footer-tagline">Providing fresh, nutritious, and delicious local beverages and snacks since 2020.</p>
      </div>

      <div class="footer-links">
        <h3>Quick Links</h3>
        <ul>
          <li><NuxtLink to="#products">Products</NuxtLink></li>
          <li><NuxtLink to="#booking">Book Order</NuxtLink></li>
          <li><NuxtLink to="#consultancy">Diet Consultancy</NuxtLink></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3>Contact Us</h3>
        <p>Email: asarepatience305@gmail.com</p>
        <p>Phone: +233 (0) 501 524 186</p>
        <p>Location: Accra, Ghana</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Excellent Cuizine. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--secondary);
  color: var(--white);
  padding: 5rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1.5rem;
}

.logo-text { color: var(--white); }
.logo-accent { color: var(--primary); }

.footer-tagline {
  color: #cbd5e1;
  max-width: 300px;
}

.footer h3 {
  color: var(--white);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.footer-links ul li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #cbd5e1;
}

.footer-links a:hover {
  color: var(--primary);
  padding-left: 5px;
}

.footer-contact p {
  color: #cbd5e1;
  margin-bottom: 0.75rem;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
