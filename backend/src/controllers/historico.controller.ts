import { Response } from "express";
import { prisma } from "../database/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export async function historicoController(req: AuthRequest, res: Response) {
    const userEmail = req.userEmail;

    try {

        const user = await prisma.user.findUnique({ where: { email: userEmail } })

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." })
        }

        const { status } = req.query

        const validStatus = ["PENDENTE", "EM_ROTA", "ENTREGUE"];

        if (status && !validStatus.includes(status as string)) {
            return res.status(400).json({ error: "Status inválido" });
        }

        const where: any = {
            userId: user.id
        };

        if (status) {
            where.status = status;
        }

        const deliveries = await prisma.delivery.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                courier: {
                    select: {
                        fullName: true,
                        vehicleType: true,
                        phone: true,
                        image: true,
                    },
                },
            },
        });
        return res.status(200).json({ deliveries })
    } catch {
        return res.status(500).json({ error: "Erro interno do servidor" })
    }
}
