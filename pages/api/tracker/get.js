import prisma from "../../../utils/prisma";

// /api/tracker/get
export default async function handle(req, res) {
    const trackers = await prisma.tracker.findMany();
    res.json(trackers);
}