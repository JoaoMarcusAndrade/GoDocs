import { Request, Response } from 'express';
import crypto from "crypto";
import { client } from '../redis.js';
export async function FA2verifyController(req: Request, res: Response) {
    const { FA2code, email } = req.body;

    if (!FA2code || !email) {
        return res.status(400).json({ error: "Dados obrigatórios" });
    }

    const hashCode = crypto.createHash('sha256').update(FA2code).digest('hex');
    const redisCode = await client.get(`2FA:${email}`);

    if (!redisCode) {
        return res.status(400).json({
            error: "Código inválido ou expirado"
        });
    }
    const isValid =
        hashCode.length === redisCode.length &&
        crypto.timingSafeEqual(
            Buffer.from(hashCode),
            Buffer.from(redisCode)
        );


    if (!isValid) {
        return res.status(400).json({ error: 'Código inválido ou expirado' });
    }

    await client.del(`2FA:${email}`);
    return res.status(200).json({ message: 'Código válido' });
}