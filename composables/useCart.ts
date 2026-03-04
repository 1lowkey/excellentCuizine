export const useCart = () => {
    const cart = useState<{ id: number; name: string; price: string; quantity: number; image: string }[]>('cart', () => [])

    const addToCart = (product: any, quantity: number = 1) => {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            cart.value.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            })
        }
    }

    const removeFromCart = (id: number) => {
        cart.value = cart.value.filter(item => item.id !== id)
    }

    const updateQuantity = (id: number, quantity: number) => {
        const item = cart.value.find(item => item.id === id)
        if (item) {
            item.quantity = Math.max(1, quantity)
        }
    }

    const clearCart = () => {
        cart.value = []
    }

    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^\d.]/g, ''))
            return total + (price * item.quantity)
        }, 0)
    })

    const cartCount = computed(() => {
        return cart.value.reduce((count, item) => count + item.quantity, 0)
    })

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    }
}
