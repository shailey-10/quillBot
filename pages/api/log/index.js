import Log from "../../../db/models/Log";
const { Op } = require("sequelize");


export default async (req, res) => {

    const ITEMS_PER_PAGE = 10;

    const page = req.query.page || 1
    
    const skip = (page-1) * ITEMS_PER_PAGE

    let count = await Log.count()
    let pageCount = Math.ceil(count / ITEMS_PER_PAGE)

    let query = {offset:skip,
        limit : ITEMS_PER_PAGE,
        subQuery:false}




    const todos = await Log.findAll(query)
    res.status(200).json({todos, pageCount});
}

