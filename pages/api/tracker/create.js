import prisma from "../../../utils/prisma";

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

// POST /api/tracker/create
export default async function handle(req, res) {
    const { tid, name } = req.body;
    const locations = []
    // let num = getRandomInt(3, 10);
    // var locations = [];

    // for (var i = 0; i < num; i++) {
    //     let lng = getRandomInRange(-180, 180, 3);
    //     let lat = getRandomInRange(-90, 90, 3);
    //     let time = String(getRandomInt(0, 25)).padStart(2, '0') + ":" + String(getRandomInt(0, 61)).padStart(2, '0');
    //     locations.push(lng + "," + lat + "," + time);
    // }

    const result = await prisma.tracker.create({
        data: {
            tid,
            name,
            locations
        },
    });
    res.json(result);
}