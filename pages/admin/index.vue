<template>
    <div class="admin-dashboard">
        <div class="welcome-banner glass-morphism">
            <div class="welcome-text">
                <h2>Welcome back, Excellent Cuizine!</h2>
                <p>Here's what's happening with your store today.</p>
            </div>
            <div class="quick-actions">
                <NuxtLink to="/admin/products" class="btn btn-primary">Manage Products</NuxtLink>
                <NuxtLink to="/admin/bookings" class="btn btn-outline">Check Bookings</NuxtLink>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="stat-card glass-morphism fade-in">
                <div class="stat-icon">🍱</div>
                <div class="stat-details">
                    <h3>Total Products</h3>
                    <p class="stat-value">{{ products?.length || 0 }}</p>
                    <span class="stat-label">Items in stock</span>
                </div>
            </div>
            <div class="stat-card glass-morphism fade-in" style="animation-delay: 0.1s">
                <div class="stat-icon">📨</div>
                <div class="stat-details">
                    <h3>Total Bookings</h3>
                    <p class="stat-value">{{ bookings?.length || 0 }}</p>
                    <span class="stat-label">Requests received</span>
                </div>
            </div>
            <div class="stat-card glass-morphism fade-in" style="animation-delay: 0.2s">
                <div class="stat-icon">📈</div>
                <div class="stat-details">
                    <h3>Recent Activity</h3>
                    <p class="stat-value">Active</p>
                    <span class="stat-label">Live store status</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

const { data: products } = await useFetch('/api/products')
const { data: bookings } = await useFetch('/api/bookings')
</script>

<style scoped>
.admin-dashboard {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.welcome-banner {
    padding: 3rem;
    border-radius: 20px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
}

.welcome-text h2 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: var(--secondary);
}

.welcome-text p {
    color: var(--text-light);
}

.quick-actions {
    display: flex;
    gap: 1rem;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.stat-card {
    padding: 2rem;
    border-radius: 20px;
    background: white;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.stat-icon {
    font-size: 2.5rem;
    background: #f1f5f9;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
}

.stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: var(--primary);
    line-height: 1.2;
}

.stat-label {
    font-size: 0.85rem;
    color: var(--text-light);
    font-weight: 600;
}

@media (max-width: 1024px) {
    .welcome-banner {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
    }
}
</style>
