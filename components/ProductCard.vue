<template>
  <div class="product-card fade-in">
    <div class="product-image">
      <img :src="imgUrl" :alt="product.name" class="product-img">

      <div class="image-overlay">
        <span class="category-tag">{{ product.category }}</span>
      </div>
    </div>
    <div class="product-details">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-footer">
        <span class="price">{{ product.price }}</span>
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

const imgUrl = computed(() => {
  if (!props.product.image) return '/restOwner.jpg'
  return props.product.image.startsWith('http') || props.product.image.startsWith('data:')
    ? props.product.image
    : '/' + props.product.image
})
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

  .category-tag {
    padding: 0.1rem 0.4rem;
    font-size: 0.6rem;
    top: 0.5rem;
    left: 0.5rem;
  }
}
</style>
