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

        const newBooking = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...body
        }

        bookings.unshift(newBooking)
        await fs.writeFile(filePath, JSON.stringify(bookings, null, 2))
        return newBooking
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save booking'
        })
    }
})
