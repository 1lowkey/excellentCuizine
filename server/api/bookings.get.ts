import fs from 'node:fs/promises'
import path from 'node:path'

export default defineEventHandler(async (event) => {
    const filePath = path.resolve(process.cwd(), 'data/bookings.json')
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading bookings:', error)
        return []
    }
})
