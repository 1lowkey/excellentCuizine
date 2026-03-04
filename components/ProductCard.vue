<template>
  <div class="product-card fade-in" :class="{ 'fashion-card': product.category === 'Fashion' }">
    <div class="product-image">
      <img :src="imgUrl" :alt="product.name" class="product-img"
        :class="{ 'fashion-img': product.category === 'Fashion' }">

      <div class="image-overlay">
        <span class="category-tag">{{ product.category }}</span>
      </div>
    </div>
    <div class="product-details">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-footer">
        <span class="price">{{ product.price }}</span>
        <div class="order-controls">
          <div class="qty-selector">
            <button @click="qty = Math.max(1, qty - 1)" class="qty-btn" :disabled="qty <= 1">−</button>
            <span class="qty-value">{{ qty }}</span>
            <button @click="qty++" class="qty-btn">+</button>
          </div>
          <button @click="handleAddToCart" class="btn-add" :class="{ 'added': isAdded }">
            {{ isAdded ? 'Added! ✓' : 'Add' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useCart()
const qty = ref(1)
const isAdded = ref(false)

const imgUrl = computed(() => {
  if (!props.product.image) return '/restOwner.jpg'
  return props.product.image.startsWith('http') || props.product.image.startsWith('data:')
    ? props.product.image
    : '/' + props.product.image
})

const handleAddToCart = () => {
  addToCart(props.product, qty.value)
  isAdded.value = true
  setTimeout(() => {
    isAdded.value = false
    qty.value = 1
  }, 2000)
}
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.product-image {
  height: 250px;
  /* Increased from 220px to show more content */
  background: var(--surface);
  position: relative;
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 1;
  transition: var(--transition);
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
}

.category-tag {
  background: var(--glass);
  backdrop-filter: blur(4px);
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--secondary);
  text-transform: uppercase;
}

.product-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
}

.product-details h3 {
  margin-bottom: 0;
  font-size: 1.1rem;
  line-height: 1.2;
}

.product-details p {
  color: var(--text-light);
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 0.4rem;
}

.price {
  font-weight: 800;
  font-size: 1rem;
  color: var(--primary);
  white-space: nowrap;
}

.order-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.qty-selector {
  display: flex;
  align-items: center;
  background: var(--surface);
  border-radius: 20px;
  padding: 0.15rem;
  border: 1px solid #e2e8f0;
}

.qty-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: white;
  color: var(--secondary);
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  font-size: 1rem;
}

.qty-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-value {
  width: 18px;
  text-align: center;
  font-weight: 700;
  font-size: 0.8rem;
  margin: 0 0.1rem;
}

.btn-add {
  background: var(--secondary);
  color: white;
  border: none;
  padding: 0.35rem 0.7rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);
  min-width: 50px;
}

.btn-add:hover {
  background: var(--primary);
  transform: scale(1.02);
}

.btn-add.added {
  background: #10b981;
}

@media (max-width: 640px) {
  .product-card {
    border-radius: 12px;
  }

  .product-image {
    height: 110px;
  }

  .product-details {
    padding: 0.6rem;
    gap: 0.3rem;
  }

  .product-details h3 {
    font-size: 0.9rem;
  }

  .product-details p {
    font-size: 0.75rem;
    margin-bottom: 0.2rem;
  }

  .price {
    font-size: 0.85rem;
  }

  .order-controls {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 0.3rem;
  }

  .qty-selector {
    justify-content: space-between;
    padding: 0.1rem;
  }

  .qty-btn {
    width: 20px;
    height: 20px;
  }

  .btn-add {
    width: 100%;
    padding: 0.3rem;
    font-size: 0.75rem;
  }

  .category-tag {
    padding: 0.1rem 0.4rem;
    font-size: 0.6rem;
    top: 0.5rem;
    left: 0.5rem;
  }
}

/* Fashion Specific Styling */
.fashion-card .product-image {
  height: 450px;
  /* Significantly increased for full-length visibility */
}

.fashion-img {
  object-position: center 10%;
  /* Show more of the body while keeping the head */
}

@media (max-width: 640px) {
  .fashion-card .product-image {
    height: 320px;
  }
}
</style>
