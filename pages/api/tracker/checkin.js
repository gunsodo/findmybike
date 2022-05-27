import prisma from "../../../utils/prisma";

// POST /api/tracker/checkin
export default async function handle(req, res) {
    const { tracker_id, lng, lat, time } = req.body;

    const result = await prisma.tracker.update({
        where: {
            id: tracker_id
        },
        data:{
            locations: {
                push: String(lng) + "," + String(lat) + "," + String(time)
            },
        }
    });
    res.json(result);
}