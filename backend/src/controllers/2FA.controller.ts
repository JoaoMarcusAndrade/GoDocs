import { Request, Response } from 'express';
import crypto from "crypto";
import { client } from '../redis.js';
export async function FA2verifyController(req: Request, res: Response) {
    const { FA2code, email } = req.body;
    const hashCode = crypto.createHash('sha256').update(FA2code).digest('hex');
    const redisCode = await client.get(`2FA:${email}`);
    if (!redisCode) {
        return res.status(400).json({ error: 'o codigo de authenticação não existe ou expirou' });
    }
    if (hashCode !== redisCode) {
        return res.status(400).json({ error: 'o codigo de authenticação está errado' });
    }

    await client.del(`2FA:${email}`);
    return res.status(200).json({ message: 'o codigo está correto' });
}