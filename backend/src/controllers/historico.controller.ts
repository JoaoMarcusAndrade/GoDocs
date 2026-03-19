import { Response } from "express";
import { prisma } from "../database/prisma.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export async function historicoController(req:AuthRequest, res:Response) {
    const userEmail = req.userEmail;

    const user = await prisma.user.findUnique ({ where: {email: userEmail}})

    if (!user) {
        return res.status(404).json({errpr: "Usuário não encontrado."})
    }

    const { status } = req.query

    const deliveries = await prisma.delivery.findMany ({
        where: {
            userId: user.id,
            ...(status ? { status: status as any } : {}),
        },
        orderBy: { createdAt: "desc"},
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
}
