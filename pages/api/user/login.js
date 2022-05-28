import prisma from "../../../utils/prisma";

// /api/user/login
export default async function handle(req, res) {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    if(!user) res.status(404).json()
    else if(user.password != password) res.status(403).json()
    else res.json(user);
}