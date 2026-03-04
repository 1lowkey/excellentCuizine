<template>
    <div class="cart-container">
        <!-- Floating Cart Trigger -->
        <button class="cart-trigger glass-morphism" @click="isOpen = true">
            <span class="cart-icon">🛒</span>
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Cart Overlay -->
        <Transition name="fade">
            <div v-if="isOpen" class="cart-overlay" @click="isOpen = false"></div>
        </Transition>

        <!-- Cart Sidebar -->
        <Transition name="slide">
            <div v-if="isOpen" class="cart-sidebar glass-morphism">
                <div class="cart-header">
                    <h2>Your Order</h2>
                    <button class="close-btn" @click="isOpen = false">×</button>
                </div>

                <div v-if="cart.length === 0" class="empty-cart">
                    <p>Your cart is empty.</p>
                    <button class="btn btn-primary" @click="isOpen = false">Browse Menu</button>
                </div>

                <div v-else class="cart-content">
                    <div class="cart-items">
                        <div v-for="item in cart" :key="item.id" class="cart-item">
                            <img :src="item.image" :alt="item.name" class="item-img">
                            <div class="item-info">
                                <h3>{{ item.name }}</h3>
                                <div class="item-controls">
                                    <div class="qty-selector">
                                        <button @click="updateQuantity(item.id, item.quantity - 1)"
                                            class="qty-btn">−</button>
                                        <span class="qty-value">{{ item.quantity }}</span>
                                        <button @click="updateQuantity(item.id, item.quantity + 1)"
                                            class="qty-btn">+</button>
                                    </div>
                                    <span class="item-price">{{ item.price }}</span>
                                </div>
                            </div>
                            <button class="remove-item" @click="removeFromCart(item.id)">🗑️</button>
                        </div>
                    </div>

                    <div class="cart-footer">
                        <div class="cart-total">
                            <span>Total</span>
                            <span class="total-amount">GHS {{ cartTotal.toFixed(2) }}</span>
                        </div>
                        <button class="btn btn-primary w-100" @click="showCheckout = true">Checkout</button>
                    </div>
                </div>
            </div>
        </Transition>

        <!-- Checkout Modal -->
        <Teleport to="body">
            <div v-if="showCheckout" class="checkout-modal-overlay" @click.self="showCheckout = false">
                <div class="checkout-modal glass-morphism">
                    <div class="modal-header">
                        <h2>Place Your Order</h2>
                        <button class="close-btn" @click="showCheckout = false">×</button>
                    </div>

                    <form @submit.prevent="handleCheckout" class="checkout-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input v-model="form.name" type="text" required placeholder="Afiya Mensah">
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input v-model="form.phone" type="tel" required placeholder="024 123 4567">
                        </div>
                        <div class="form-group">
                            <label>Delivery Address</label>
                            <textarea v-model="form.address" required
                                placeholder="Enter street and landmark"></textarea>
                        </div>
                        <div class="order-summary">
                            <p>Items: {{ cartCount }}</p>
                            <p class="total">Total: GHS {{ cartTotal.toFixed(2) }}</p>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">
                            {{ isSubmitting ? 'Processing...' : 'Confirm Order' }}
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart()
const isOpen = ref(false)
const showCheckout = ref(false)
const isSubmitting = ref(false)

const form = ref({
    name: '',
    phone: '',
    address: ''
})

const handleCheckout = async () => {
    isSubmitting.value = true
    try {
        const orderData = {
            ...form.value,
            items: cart.value,
            total: `GHS ${cartTotal.value.toFixed(2)}`,
            date: new Date().toISOString(),
            status: 'Pending'
        }

        await $fetch('/api/orders', {
            method: 'POST',
            body: orderData
        })

        alert('Order placed successfully! We will contact you soon.')
        clearCart()
        showCheckout.value = false
        isOpen.value = false
    } catch (e) {
        alert('Error placing order. Please try again.')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
.cart-trigger {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 1000;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
}

.cart-trigger:hover {
    transform: scale(1.1);
}

.cart-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--primary);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1001;
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 340px;
    height: 100vh;
    background: white;
    z-index: 1002;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
}

@media (max-width: 480px) {
    .cart-sidebar {
        width: 100%;
        padding: 1rem;
    }
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
}

.cart-header h2 {
    font-size: 1.25rem;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: var(--text-light);
}

.cart-items {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 1.25rem;
}

.cart-item {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f5f9;
    align-items: center;
}

.item-img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
}

.item-info h3 {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
}

.item-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.qty-selector {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: #f8fafc;
    border-radius: 12px;
    padding: 0.15rem 0.4rem;
}

.qty-btn {
    background: white;
    border: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-size: 0.9rem;
}

.qty-value {
    font-size: 0.8rem;
    font-weight: 700;
}

.item-price {
    font-size: 0.85rem;
    color: var(--primary);
    font-weight: 700;
}

.remove-item {
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: auto;
    opacity: 0.5;
    font-size: 0.9rem;
}

.cart-footer {
    border-top: 1px solid #f1f5f9;
    padding-top: 1rem;
}

.cart-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-weight: 700;
    font-size: 1.1rem;
}

.total-amount {
    color: var(--primary);
}

/* Modal Styles */
.checkout-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.checkout-modal {
    background: white;
    width: 100%;
    max-width: 440px;
    border-radius: 16px;
    padding: 1.5rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
}

.modal-header h2 {
    font-size: 1.25rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.35rem;
    font-weight: 600;
    font-size: 0.85rem;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.65rem;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
}

.order-summary {
    background: #f8fafc;
    padding: 0.75rem;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    font-size: 0.9rem;
}

.order-summary .total {
    font-weight: 700;
    font-size: 1rem;
    color: var(--primary);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.w-100 {
    width: 100%;
}
</style>
