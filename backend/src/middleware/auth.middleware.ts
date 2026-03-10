import { Request, Response, NextFunction } from "express";
import { client } from "../redis.js";

export interface AuthRequest extends Request {
    userEmail?: string;
}

export async function authMiddleware (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token de autenticação ausente ou inválido" });
    }

    const sessionToken = authHeader.split("")[1];
    const email = await client.get(`session:${sessionToken}`);
    
    if (!email) {
        return res.status(401).json({ error: "Sessão inválida" });
    }

    await client.expire(`session:${sessionToken}`, 60 * 60 * 24);
    req.userEmail = email;
    next();
}