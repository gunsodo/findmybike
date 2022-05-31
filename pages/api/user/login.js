import prisma from "../../../utils/prisma";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../utils/session";

// /api/user/login
export default withIronSessionApiRoute(async function handle(req, res) {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    if (!user) res.status(404).json()
    else if (user.password != password) res.status(403).json()
    else {
        req.session.user = user;
        await req.session.save();
        res.json(user);
    }
}, sessionOptions)
