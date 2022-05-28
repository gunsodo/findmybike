import prisma from "../../../utils/prisma";

// POST /api/tracker/checkin
export default async function handle(req, res) {
    const { id, long, lat, time } = req.body;
    const result = await prisma.tracker.update({
        where: {
            id: id
        },
        data:{
            locations: {
                push: String(long) + "," + String(lat) + "," + String(time)
            },
        }   
    });
    res.json(result);
}