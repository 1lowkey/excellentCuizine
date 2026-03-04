import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const filePath = path.resolve(process.cwd(), 'data/products.json')
    const body = await readBody(event)
    const method = getMethod(event)
    const query = getQuery(event)

    if (method === 'POST') {
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            let products = JSON.parse(data)

            const productData = { ...body }
            // Remove imageData if it exists, as we now use direct URLs from Firebase
            if (productData.imageData) delete productData.imageData
            if (productData.file) delete productData.file

            const index = products.findIndex((p: any) => p.id === body.id)
            if (index !== -1) {
                products[index] = { ...products[index], ...productData }
            } else {
                const nextId = products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1
                products.push({ ...productData, id: nextId })
            }

            await fs.writeFile(filePath, JSON.stringify(products, null, 2))
            return { success: true }
        } catch (e) {
            console.error('Save error:', e)
            throw createError({ statusCode: 500, statusMessage: 'Save error' })
        }
    }
})
