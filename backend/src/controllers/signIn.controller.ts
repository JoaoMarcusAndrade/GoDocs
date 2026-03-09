import { authEmail } from "../services/authEmail.service.js";
import { Request, Response } from 'express'
import { client } from "../redis.js";

export async function signInController(req: Request, res: Response) {
    const { email, phone, pass } = req.body

    if (!email) {
        return res.status(400).json({ error: "Email deve ser obrigatório!" });
    }

    const validations = [
        { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, value: email, error: "Email inválido!" },
        { regex: /^\d{2}9\d{8}$/, value: phone, error: "Telefone inválido!" },
        { regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, value: pass, error: "Senha inválida!" }
    ];

    for (const v of validations) {
        if (!v.regex.test(v.value)) {
            return res.status(422).json({ error: v.error });
        }
    }

    try {
        console.log("authcontroller")
        await client.del(`2FA:${email}`)
        const hashCode = await authEmail(email)
        await client.set(`2FA:${email}`, hashCode, {
            EX: 300
        });
        return res.status(200).json({ message: "Email enviado!" });
    } catch {
        return res.status(500).json({ message: "deu errado" })
    }
}