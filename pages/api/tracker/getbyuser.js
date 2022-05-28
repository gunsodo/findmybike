import prisma from "../../../utils/prisma";

// /api/tracker/getbyuser
export default async function handle(req, res) {
    const { uid } = req.body;
    const trackers = await prisma.tracker.findMany({
        where: {
            ownerId: uid,
        },
    });
    res.json(trackers);
}