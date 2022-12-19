import Log from "../../../../db/models/Log";


export default async (req, res) => {

if (req.method === "POST") {
    const {   title ,
        field ,
        act ,
        prevValue,
        currValue,
        date } = req.body;
    const log = await Log.create({
      title ,
      field ,
      act ,
      prevValue,
      currValue,
      date
    });
    res.status(201).json(log);
  }

}