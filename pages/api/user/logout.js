import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../utils/session";

// /api/user/login
export default withIronSessionApiRoute(async function handle(req, res) {
    req.session.destroy();
    res.send({ ok: true });
}, sessionOptions)

