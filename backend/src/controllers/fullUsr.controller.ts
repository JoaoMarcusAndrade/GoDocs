import { prisma } from '../database/prisma.js';
import { client } from '../redis.js';
import { Request, Response } from 'express';
import crypto from "crypto";

export async function fullUsrController(req: Request, res: Response) {
    const { email, name, CPF, img } = req.body;
    const userJson = await client.get(`Usr:${email}`);
    const user = JSON.parse(userJson!);

    if (!userJson) {
        return res.status(404).json({ error: "User not found in cache" });
    }

    const hashSenha = crypto.createHash('sha256').update(user.pass).digest('hex')
    await prisma.user.create({
        data: {
            email: user.email,
            number: user.phone,
            passHash: hashSenha,
            name: name,
            CPF: CPF,
            image: img
        }
    })
}