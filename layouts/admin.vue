<template>
    <div class="admin-layout">
        <aside class="admin-sidebar" :class="{ 'collapsed': isCollapsed }">
            <div class="admin-logo">
                <span class="highlight">EC</span> <span v-if="!isCollapsed">Admin</span>
            </div>
            <nav class="admin-nav">
                <NuxtLink to="/admin" class="nav-link" active-class="active" title="Dashboard">
                    <span class="icon">📊</span>
                    <span v-if="!isCollapsed" class="label">Dashboard</span>
                </NuxtLink>
                <NuxtLink to="/admin/products" class="nav-link" active-class="active" title="Products">
                    <span class="icon">🍱</span>
                    <span v-if="!isCollapsed" class="label">Products</span>
                </NuxtLink>
                <NuxtLink to="/admin/bookings" class="nav-link" active-class="active" title="Bookings">
                    <span class="icon">📨</span>
                    <span v-if="!isCollapsed" class="label">Bookings</span>
                </NuxtLink>

                <div class="nav-divider"></div>

                <NuxtLink to="/" class="nav-link return-link" title="Back to Site">
                    <span class="icon">🏠</span>
                    <span v-if="!isCollapsed" class="label">View Site</span>
                </NuxtLink>
            </nav>
            <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
                {{ isCollapsed ? '→' : '←' }}
            </button>
        </aside>

        <main class="admin-main">
            <header class="admin-header glass-morphism">
                <div class="header-content">
                    <h1>{{ pageTitle }}</h1>
                    <div class="admin-user">
                        <span class="user-badge">Owner</span>
                    </div>
                </div>
            </header>
            <div class="admin-content">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup>
const isCollapsed = ref(false)
const route = useRoute()

const pageTitle = computed(() => {
    if (route.path === '/admin') return 'Dashboard'
    if (route.path.includes('products')) return 'Inventory Management'
    if (route.path.includes('bookings')) return 'Customer Requests'
    return 'Admin'
})
</script>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background: #f1f5f9;
    width: 100%;
    overflow-x: hidden;
}

.admin-sidebar {
    width: 260px;
    background: var(--secondary);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    position: fixed;
    height: 100vh;
    transition: width 0.3s ease;
    z-index: 1000;
}

.admin-sidebar.collapsed {
    width: 80px;
}

.admin-logo {
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 3rem;
    text-align: center;
    color: white;
}

.admin-nav {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-grow: 1;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 600;
    transition: all 0.2s ease;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.nav-link.active {
    background: var(--primary);
    color: white;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.nav-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 1.5rem 0;
}

.icon {
    font-size: 1.25rem;
}

.admin-main {
    flex-grow: 1;
    margin-left: 260px;
    transition: margin-left 0.3s ease;
}

.admin-sidebar.collapsed+.admin-main {
    margin-left: 80px;
}

.admin-header {
    padding: 1.5rem 3rem;
    position: sticky;
    top: 0;
    z-index: 100;
    margin-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.admin-header h1 {
    font-size: 1.5rem;
    font-weight: 700;
}

.user-badge {
    background: #e2e8f0;
    color: var(--secondary);
    padding: 0.4rem 1rem;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 700;
}

.admin-content {
    padding: 0 3rem 3rem;
}

.collapse-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: auto;
}

@media (max-width: 768px) {
    .admin-sidebar {
        width: 60px;
        padding: 0.75rem;
    }

    .admin-sidebar:not(.collapsed) {
        width: 60px;
        /* Force collapsed on small mobile for now */
    }

    .label {
        display: none;
    }

    .admin-main {
        margin-left: 60px;
        width: calc(100% - 60px);
    }

    .admin-header {
        padding: 1rem;
        width: 100%;
    }

    .admin-content {
        padding: 0 1rem 1.5rem;
    }
}
</style>
