// pages/api/health.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getActiveDb } from '@/lib/db/databaseManager';

const db = await getActiveDb();


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const db = await getActiveDb();
        await db.get('SELECT 1');
        res.status(200).json({ status: 'healthy', message: 'Database connection successful' });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(503).json({ 
            status: 'unhealthy', 
            message: 'Database connection failed',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}