<template>
    <main>
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="container hero-content">
                <div class="hero-text fade-in">
                    <span class="badge">Fresh & Nutritious</span>
                    <h1>Authentic Local Flavors, <br /><span class="highlight">Premium Experience.</span></h1>
                    <p>From refreshing Sobolo to crunchy Nkatie Cake, we bring the best of Ghanaian flavors to your
                        doorstep.
                        Healthy, natural, and absolutely delicious.</p>
                    <div class="hero-cta">
                        <a href="#products" class="btn btn-primary">Explore Menu</a>
                        <a href="#consultancy" class="btn btn-outline">Diet Consultancy</a>
                    </div>
                </div>
                <div class="hero-visual fade-in">
                    <div class="hero-image-wrapper glass-morphism">
                        <img src="/public/me.jpg" alt="Excellent Cuizine Sobolo" class="hero-img">
                    </div>
                </div>
            </div>
            <div class="hero-wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        class="shape-fill"></path>
                </svg>
            </div>
        </section>

        <!-- Products Section -->
        <section id="products" class="section-padding">
            <div class="container">
                <div class="section-header">
                    <h2>Our Collections</h2>
                    <div class="title-underline"></div>
                    <p>Delicious food meets elegant style.</p>
                </div>

                <!-- Category Filter -->
                <div class="category-filter">
                    <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" class="filter-btn"
                        :class="{ active: selectedCategory === cat }">
                        {{ cat }}
                    </button>
                </div>

                <div class="products-container">
                    <!-- Dynamic Grid Based on Filter -->
                    <div v-if="selectedCategory === 'All' || selectedCategory === 'Drinks'"
                        class="category-section mt-5">
                        <div class="category-header">
                            <h3>Refreshing Drinks</h3>
                        </div>
                        <div class="product-grid">
                            <ProductCard v-for="product in drinks" :key="product.id" :product="product" />
                        </div>
                    </div>

                    <div v-if="selectedCategory === 'All' || selectedCategory === 'Snacks'"
                        class="category-section mt-5">
                        <div class="category-header">
                            <h3>Local & Foreign Snacks</h3>
                        </div>
                        <div class="product-grid">
                            <ProductCard v-for="product in snacks" :key="product.id" :product="product" />
                        </div>
                    </div>

                    <div v-if="selectedCategory === 'All' || selectedCategory === 'Snacks'"
                        class="category-section mt-5">
                        <div class="category-header">
                            <h3>Local & Foreign Snacks</h3>
                        </div>
                        <div class="product-grid">
                            <ProductCard v-for="product in snacks" :key="product.id" :product="product" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="consultancy" class="consultancy-section section-padding">
            <div class="container consultancy-grid">
                <div class="consultancy-text fade-in">
                    <span class="badge">Expert Advice</span>
                    <h2>Healthy Living with <br />Excellent Cuizine</h2>
                    <p>Beyond our delicious menu, we offer professional diet consultancy services. Whether you're
                        looking for
                        weight management or healthy meal planning, we're here to help.</p>

                    <div class="feature-item">
                        <div class="icon-box">🥗</div>
                        <div>
                            <h3>Diet Consultancy</h3>
                            <p>Personalized nutrition plans tailored to your lifestyle.</p>
                        </div>
                    </div>

                    <div class="feature-item">
                        <div class="icon-box">🎉</div>
                        <div>
                            <h3>Event Catering</h3>
                            <p>Book us for your weddings, parties, and corporate events.</p>
                        </div>
                    </div>
                </div>

                <div id="booking" class="booking-wrapper">
                    <BookingForm />
                </div>
            </div>
        </section>

        <!-- Shopping Cart Removed -->
    </main>
</template>

<script setup>
import productsData from '~/data/products.json'

const products = ref(productsData)
const selectedCategory = ref('All')
const categories = ['All', 'Drinks', 'Snacks']

const drinks = computed(() => products.value?.filter(p => p.category === 'Drinks') || [])
const snacks = computed(() => products.value?.filter(p => p.category === 'Snacks') || [])
</script>

<style scoped>
/* Scoped styles from app.vue moved here */
.mt-5 {
    margin-top: 5rem;
}

.mb-5 {
    margin-bottom: 5rem;
}

.section-header {
    margin-bottom: 3rem;
    text-align: center;
}

.section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

.section-header .title-underline {
    margin: 0 auto 1rem;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

@media (max-width: 640px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .section-header h2 {
        font-size: 1.75rem;
    }
}

.category-filter {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 99px;
    border: 2px solid #e2e8f0;
    background: white;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition);
    color: var(--text-light);
}

.filter-btn:hover {
    border-color: var(--primary);
    color: var(--primary);
}

.filter-btn.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    box-shadow: var(--shadow);
}

.category-header {
    margin-bottom: 2rem;
    text-align: left;
    border-left: 4px solid var(--primary);
    padding-left: 1rem;
}

.category-header h3 {
    font-size: 1.75rem;
    color: var(--secondary);
}

.hero-section {
    padding-top: 140px;
    padding-bottom: 80px;
    background: var(--surface);
    position: relative;
    overflow: hidden;
}

.hero-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
    gap: 4rem;
}

.hero-text h1 {
    font-size: 3.5rem;
    margin: 1.5rem 0;
    line-height: 1.1;
}

.highlight {
    color: var(--primary);
}

.hero-text p {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 2.5rem;
    max-width: 500px;
}

.hero-cta {
    display: flex;
    gap: 1rem;
}

.btn-outline {
    border: 2px solid var(--primary);
    color: var(--primary);
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    font-weight: 600;
}

.btn-outline:hover {
    background: var(--primary);
    color: var(--white);
}

.badge {
    background: rgba(255, 107, 53, 0.1);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.hero-visual {
    position: relative;
}

.hero-image-wrapper {
    height: 450px;
    border-radius: 24px;
    position: relative;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
}

.hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hero-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.hero-wave svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 60px;
}

.hero-wave .shape-fill {
    fill: var(--background);
}

.consultancy-section {
    background: var(--surface);
}

.consultancy-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
    align-items: center;
}

.consultancy-text h2 {
    font-size: 3rem;
    margin: 1.5rem 0;
}

.consultancy-text p {
    margin-bottom: 2rem;
    color: var(--text-light);
}

.feature-item {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.icon-box {
    width: 60px;
    height: 60px;
    background: var(--white);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: var(--shadow);
    flex-shrink: 0;
}

.feature-item h3 {
    font-size: 1.25rem;
    margin-bottom: 0.3rem;
}

@media (max-width: 1024px) {

    .hero-content,
    .consultancy-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
    }

    .hero-text p,
    .consultancy-text p {
        margin-left: auto;
        margin-right: auto;
    }

    .hero-cta {
        justify-content: center;
    }

    .section-header h2 {
        font-size: 2rem;
    }

    .feature-item {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
}
</style>
