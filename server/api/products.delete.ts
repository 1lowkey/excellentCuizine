import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const filePath = path.resolve(process.cwd(), 'data/products.json')
    const query = getQuery(event)
    const id = parseInt(query.id as string)

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'ID required' })
    }

    try {
        const data = await fs.readFile(filePath, 'utf-8')
        let products = JSON.parse(data)

        const initialLength = products.length
        products = products.filter((p: any) => p.id !== id)

        if (products.length === initialLength) {
            throw createError({ statusCode: 404, statusMessage: 'Product not found' })
        }

        await fs.writeFile(filePath, JSON.stringify(products, null, 2))
        return { success: true }
    } catch (e: any) {
        throw createError({
            statusCode: e.statusCode || 500,
            statusMessage: e.statusMessage || 'Delete error'
        })
    }
})
