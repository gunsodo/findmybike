import prisma from "../../../utils/prisma";

// POST /api/tracker/delete
export default async function handle(req, res) {
    const { tracker_id } = req.body;

    const result = await prisma.tracker.delete({
        where: {
            id: tracker_id
        },
    });
    res.json(result);
}