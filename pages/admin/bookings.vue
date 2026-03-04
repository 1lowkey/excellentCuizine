<template>
    <div class="admin-bookings">
        <div class="toolbar glass-morphism">
            <div class="search-wrapper">
                <span class="search-icon">🔍</span>
                <input v-model="searchQuery" placeholder="Search by name or email..." class="search-input" />
            </div>
            <div class="stats-mini">
                <strong>{{ filteredBookings.length }}</strong> Bookings Found
            </div>
        </div>

        <div v-if="filteredBookings.length === 0" class="empty-state">
            <div class="empty-icon">📂</div>
            <p>No customer bookings found.</p>
        </div>

        <div v-else class="bookings-grid">
            <div v-for="booking in filteredBookings" :key="booking.id" class="booking-card glass-morphism fade-in">
                <div class="booking-header">
                    <div class="booking-badge"
                        :class="((booking.type || booking.bookingType || 'booking').toString()).toLowerCase()">
                        {{ booking.type || booking.bookingType }}
                    </div>
                    <span class="booking-date">{{ formatDate(booking.createdAt) }}</span>
                </div>

                <div class="booking-body">
                    <div class="customer-info">
                        <span class="customer-icon">👤</span>
                        <div>
                            <h3>{{ booking.name }}</h3>
                            <p class="contact-line">{{ booking.phone }}</p>
                            <p v-if="booking.email" class="contact-line">{{ booking.email }}</p>
                            <p v-if="booking.address" class="address-line">📍 {{ booking.address }}</p>
                        </div>
                    </div>

                    <!-- For Orders -->
                    <div v-if="booking.items" class="order-items">
                        <h4>Order Items</h4>
                        <ul>
                            <li v-for="item in booking.items" :key="item.id">
                                {{ item.quantity }}x {{ item.name }} ({{ item.price }})
                            </li>
                        </ul>
                        <p class="order-total">Total: {{ booking.total }}</p>
                    </div>

                    <!-- For Bookings -->
                    <div v-if="booking.message" class="booking-message">
                        <p>"{{ booking.message }}"</p>
                    </div>
                </div>

                <div class="booking-footer">
                    <button @click="markAsContacted(booking.id)" class="btn-contacted">
                        Mark as Handled
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

const { data: rawBookings, refresh } = await useFetch('/api/bookings')
const searchQuery = ref('')
const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true
})

const filteredBookings = computed(() => {
    const list = Array.isArray(rawBookings.value) ? rawBookings.value : []

    // During SSR or before mount, return full list (no filtering)
    if (!isMounted.value || !searchQuery.value) return list

    const q = searchQuery.value.toLowerCase()
    return list.filter(b => {
        if (!b) return false
        const name = (b.name || '').toString().toLowerCase()
        const email = (b.email || '').toString().toLowerCase()
        return name.includes(q) || email.includes(q)
    })
})

const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch (e) {
        return 'Invalid Date'
    }
}

const markAsContacted = async (id) => {
    alert('Action logged. (Backend sync coming soon)')
}
</script>

<style scoped>
.admin-bookings {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.toolbar {
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
}

.search-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
}

.search-input {
    width: 100%;
    padding: 0.85rem 1rem 0.85rem 2.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    outline: none;
    font-family: inherit;
    transition: var(--transition);
}

.stats-mini {
    font-size: 0.9rem;
    color: var(--text-light);
}

.bookings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 1.25rem;
}

.booking-card {
    background: white;
    border-radius: 16px;
    padding: 1.25rem;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.booking-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
}

.booking-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.booking-badge.order {
    background: #dcfce7;
    color: #166534;
}

.booking-badge.consultancy {
    background: #fef9c3;
    color: #854d0e;
}

.booking-badge.event {
    background: #dbeafe;
    color: #1e40af;
}

.booking-date {
    font-size: 0.75rem;
    color: var(--text-light);
    font-weight: 600;
}

.customer-info {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

.customer-icon {
    font-size: 1.25rem;
    background: #f1f5f9;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    flex-shrink: 0;
}

.customer-info h3 {
    font-size: 1rem;
    color: var(--secondary);
    margin-bottom: 0;
}

.contact-line {
    font-size: 0.85rem;
    color: var(--text-light);
    font-weight: 500;
}

.address-line {
    font-size: 0.8rem;
    color: var(--secondary);
    margin-top: 0.15rem;
    font-weight: 600;
}

.order-items {
    background: #f8fafc;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    margin-top: 0.75rem;
    border: 1px solid #e2e8f0;
}

.order-items h4 {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
    color: var(--text-light);
}

.order-items ul {
    list-style: none;
    padding: 0;
}

.order-items li {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    color: var(--secondary);
    font-weight: 600;
}

.order-total {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed #cbd5e1;
    font-weight: 800;
    color: var(--primary);
    font-size: 0.95rem;
}

.booking-message {
    background: #f8fafc;
    padding: 0.75rem;
    border-radius: 10px;
    font-style: italic;
    font-size: 0.85rem;
    color: var(--text-light);
    border-left: 3px solid var(--primary);
}

.booking-footer {
    margin-top: auto;
    border-top: 1px solid #f1f5f9;
    padding-top: 0.75rem;
}

.btn-contacted {
    width: 100%;
    padding: 0.6rem;
    border-radius: 8px;
    border: 2px solid #e2e8f0;
    background: transparent;
    font-weight: 700;
    color: var(--text-light);
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.85rem;
}

.btn-contacted:hover {
    background: #f8fafc;
    border-color: var(--text-light);
}

.empty-state {
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    color: var(--text-light);
}

.empty-icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
}

@media (max-width: 640px) {
    .bookings-grid {
        grid-template-columns: 1fr;
    }
}
</style>
