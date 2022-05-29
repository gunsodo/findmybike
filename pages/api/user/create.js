import prisma from "../../../utils/prisma";

// POST /api/user/create
export default async function handle(req, res) {
    const { username, password, name } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    if(user) res.status(409).json()
    else{
        const result = await prisma.user.create({
            data: {
                username,
                password,
                name
            },
        });
        res.json(result);
    }
}