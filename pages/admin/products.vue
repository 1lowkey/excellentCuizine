<template>
    <div class="admin-products">
        <div class="toolbar glass-morphism">
            <div class="toolbar-top">
                <div class="search-wrapper">
                    <span class="search-icon">🔍</span>
                    <input v-model="searchQuery" placeholder="Search orders/items..." class="search-input" />
                </div>
                <button @click="openAddModal" class="btn btn-primary add-btn">
                    <span>+</span> Add Item
                </button>
            </div>

            <div class="filter-wrapper">
                <div class="filter-group">
                    <button v-for="cat in availableCategories" :key="cat" @click="selectedCategory = cat"
                        class="filter-btn" :class="{ active: selectedCategory === cat }">
                        {{ cat }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="empty-state">
            <p>No items found matching your search.</p>
        </div>

        <div class="product-management-grid">
            <div v-for="product in filteredProducts" :key="product.id" class="admin-product-card glass-morphism fade-in"
                @click="editProduct(product)">
                <div class="card-image">
                    <img :src="product.image.startsWith('http') || product.image.startsWith('data:') ? product.image : '/' + product.image"
                        alt="Product Image" />
                    <div class="card-badge">{{ product.category }}</div>
                </div>
                <div class="card-details">
                    <div class="card-header">
                        <h3>{{ product.name }}</h3>
                        <span class="card-price">{{ product.price }}</span>
                    </div>
                    <p class="card-description">{{ product.description }}</p>
                    <div class="card-actions">
                        <button class="action-link edit">Quick Edit</button>
                        <button @click.stop="deleteProduct(product.id)" class="action-link delete">Remove</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Modal -->
        <Teleport to="body">
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content glass-morphism fade-in">
                    <div class="modal-header">
                        <h2>{{ editingProduct ? 'Edit Product' : 'Add New Item' }}</h2>
                        <button @click="closeModal" class="close-btn">&times;</button>
                    </div>

                    <form @submit.prevent="saveProduct" class="admin-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Item Name</label>
                                <input v-model="form.name" required placeholder="e.g. Fresh Mango Juice" />
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <div class="category-input-group">
                                    <select v-if="!showNewCategoryInput" v-model="form.category">
                                        <option v-for="cat in selectableCategories" :key="cat" :value="cat">{{ cat }}
                                        </option>
                                        <option value="__NEW__">+ New Category...</option>
                                    </select>
                                    <input v-else v-model="newCategoryName" placeholder="Enter category name"
                                        @blur="handleCategoryBlur" ref="newCategoryInput" />
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label>Price (Include currency)</label>
                                <input v-model="form.price" required placeholder="GHS 15.00" />
                            </div>
                            <div class="form-group">
                                <label>Product Image</label>
                                <div class="image-upload-zone" @click="$refs.fileInput.click()">
                                    <input type="file" ref="fileInput" hidden @change="handleFileUpload"
                                        accept="image/*" />
                                    <div v-if="!form.image" class="upload-placeholder">
                                        <span class="upload-icon">📸</span>
                                        <p>Select</p>
                                    </div>
                                    <img v-else
                                        :src="imagePreviewUrl || (form.image.startsWith('http') || form.image.startsWith('data:') ? form.image : '/' + form.image)"
                                        class="upload-preview" />
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Description (Optional)</label>
                            <textarea v-model="form.description" rows="2"
                                placeholder="Tell us about this item..."></textarea>
                        </div>

                        <div class="modal-footer">
                            <button type="button" @click="closeModal" class="btn btn-outline">Cancel</button>
                            <button type="submit" class="btn btn-primary">
                                {{ editingProduct ? 'Save Changes' : 'Save Item' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const { $firebaseStorage } = useNuxtApp()

const { data: products, refresh } = await useFetch('/api/products')
const searchQuery = ref('')
const selectedCategory = ref('All')

const availableCategories = computed(() => {
    if (!products.value) return ['All']
    const cats = [...new Set(products.value.map(p => p.category))]
    return ['All', ...cats]
})

const selectableCategories = computed(() => {
    if (!products.value) return ['Drinks', 'Snacks']
    return [...new Set(products.value.map(p => p.category))]
})

const filteredProducts = computed(() => {
    if (!products.value) return []
    return products.value.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCategory = selectedCategory.value === 'All' || p.category === selectedCategory.value
        return matchesSearch && matchesCategory
    })
})

const showModal = ref(false)
const editingProduct = ref(null)
const showNewCategoryInput = ref(false)
const newCategoryName = ref('')
const newCategoryInput = ref(null)
const imagePreviewUrl = ref(null)

const form = ref({
    name: '',
    category: 'Drinks',
    price: '',
    description: '',
    image: '',
    imageData: null,
    file: null
})

watch(() => form.value.category, (newVal) => {
    if (newVal === '__NEW__') {
        showNewCategoryInput.value = true
        nextTick(() => {
            newCategoryInput.value?.focus()
        })
    }
})

const handleCategoryBlur = () => {
    if (newCategoryName.value.trim()) {
        form.value.category = newCategoryName.value.trim()
    } else {
        form.value.category = selectableCategories.value[0] || 'Drinks'
    }
    showNewCategoryInput.value = false
    newCategoryName.value = ''
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreviewUrl.value = e.target.result
            form.value.imageData = e.target.result
        }
        reader.readAsDataURL(file)
        form.value.image = file.name
        form.value.file = file
    }
}

const openAddModal = () => {
    editingProduct.value = null
    form.value = { name: '', category: selectableCategories.value[0] || 'Drinks', price: '', description: '', image: '', file: null }
    imagePreviewUrl.value = null
    showModal.value = true
}

const editProduct = (product) => {
    editingProduct.value = product
    form.value = { ...product }
    imagePreviewUrl.value = null
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    editingProduct.value = null
    showNewCategoryInput.value = false
}

const saveProduct = async () => {
    try {
        let imageUrl = form.value.image

        if (form.value.file) {
            const fileName = `products/${Date.now()}_${form.value.file.name}`
            const fileRef = storageRef($firebaseStorage, fileName)
            const snapshot = await uploadBytes(fileRef, form.value.file)
            imageUrl = await getDownloadURL(snapshot.ref)
        }

        await $fetch('/api/products', {
            method: 'POST',
            body: { ...form.value, image: imageUrl, id: editingProduct.value?.id }
        })
        await refresh()
        imagePreviewUrl.value = null
        closeModal()
    } catch (e) {
        console.error('Upload/Save error:', e)
        alert('Failed to save product.')
    }
}

const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to remove this item?')) return
    try {
        await $fetch(`/api/products?id=${id}`, { method: 'DELETE' })
        await refresh()
    } catch (e) {
        alert('Error deleting product')
    }
}
</script>

<style scoped>
.admin-products {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
}

.toolbar {
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-shadow: var(--shadow);
}

.toolbar-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.search-wrapper {
    flex-grow: 1;
    position: relative;
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

.filter-wrapper {
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
}

.filter-group {
    display: inline-flex;
    gap: 0.5rem;
    background: #f1f5f9;
    padding: 0.4rem;
    border-radius: 12px;
}

.filter-btn {
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--text-light);
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    white-space: nowrap;
}

.filter-btn.active {
    background: white;
    color: var(--secondary);
    box-shadow: var(--shadow);
}

.product-management-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    width: 100%;
}

.admin-product-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
}

.card-image {
    height: 160px;
    position: relative;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.75rem;
    font-weight: 700;
}

.card-details {
    padding: 1.5rem;
    flex-grow: 1;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.card-header h3 {
    font-size: 1.1rem;
    color: var(--secondary);
}

.card-price {
    color: var(--primary);
    font-weight: 800;
}

.card-description {
    font-size: 0.85rem;
    color: var(--text-light);
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-actions {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #f1f5f9;
    padding-top: 1rem;
}

.action-link {
    background: none;
    border: none;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
}

.action-link.edit {
    color: var(--primary);
}

.action-link.delete {
    color: #ef4444;
}

.modal-overlay {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    background: rgba(0, 0, 0, 0.7) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 9999 !important;
    padding: 20px;
}

.modal-content {
    background: white;
    width: 100%;
    max-width: 550px;
    border-radius: 24px;
    padding: 2.5rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-light);
}

.admin-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.form-group label {
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    outline: none;
    font-family: inherit;
    width: 100%;
}

.image-upload-zone {
    height: 45px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #f8fafc;
}

.upload-placeholder {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-light);
}

.upload-preview {
    height: 100%;
    width: 40px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 10px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .toolbar-top {
        flex-direction: column;
        align-items: stretch;
    }

    .add-btn {
        width: 100%;
    }

    .product-management-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 0.75rem;
    }

    .admin-product-card {
        border-radius: 12px;
    }

    .card-image {
        height: 110px;
    }

    .card-details {
        padding: 0.75rem;
    }

    .card-header h3 {
        font-size: 0.85rem;
    }

    .card-price {
        font-size: 0.8rem;
    }

    .card-description {
        display: none;
    }

    .modal-content {
        padding: 1.5rem;
        border-radius: 20px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
