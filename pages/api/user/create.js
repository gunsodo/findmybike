import prisma from "../../../utils/prisma";

// POST /api/user/create
export default async function handle(req, res) {
    const { username, password, name } = req.body;
    
    const result = await prisma.user.create({
        data: {
            username,
            password,
            name
        },
    });
    res.json(result);
}