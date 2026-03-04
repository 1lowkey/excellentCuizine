import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const filePath = path.resolve(process.cwd(), 'data/bookings.json')
    const body = await readBody(event)

    try {
        let bookings = []
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            bookings = JSON.parse(data)
        } catch (e) {
            // file may not exist initially
        }

        const newOrder = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            type: 'Order', // Distinguish from 'Booking'
            ...body
        }

        bookings.unshift(newOrder)
        await fs.writeFile(filePath, JSON.stringify(bookings, null, 2))
        return newOrder
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save order'
        })
    }
})
