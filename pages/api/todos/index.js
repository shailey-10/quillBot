import Todo from "../../../db/models/Todo";
const { Op } = require("sequelize");



async function searchResults(req, res) {
    
    const ITEMS_PER_PAGE = 10;
    const page = req.query.page || 1
    const skip = (page-1) * ITEMS_PER_PAGE
    
    let query = {offset:skip,
        limit : ITEMS_PER_PAGE,
        subQuery:false}
    
    let count = await Todo.count(query)
    
    let pageCount = Math.ceil(count / ITEMS_PER_PAGE)
    
    let lookupValue = req.query.search.toLowerCase();
    
    const todosLength = await Todo.findAll({
        where: {
            title: {
                [Op.like]: `%${lookupValue}%`
            }
        }
    })
    
    const todos = await Todo.findAll({
        offset:skip,
        limit : ITEMS_PER_PAGE,
        where: {
            title: {
                [Op.like]: `%${lookupValue}%`
            }
        }
    })
    count = todosLength.length
    pageCount = Math.ceil(count / ITEMS_PER_PAGE)
    return {todos, pageCount}
}

async function getSorted (req, res) {
    const ITEMS_PER_PAGE = 10;
    const page = req.query.page || 1
    const skip = (page-1) * ITEMS_PER_PAGE
    let query = {offset:skip,
        limit : ITEMS_PER_PAGE,
        subQuery:false}
    let count = await Todo.count(query)
    
    let pageCount = Math.ceil(count / ITEMS_PER_PAGE)
    const sortQuery = {
        order: [[req.query.sortBy.split(/\s+/)[0], req.query.sortBy.split(/\s+/)[1]]],
        offset:skip,
        limit : ITEMS_PER_PAGE,
        subQuery:false,
    }
    const todos = await Todo.findAll(sortQuery)
    return{todos, pageCount};
}

async function sortSearch(req, res){

    let lookupValue = req.query.search.toLowerCase();

    const ITEMS_PER_PAGE = 10;
    const page = req.query.page || 1
    const skip = (page-1) * ITEMS_PER_PAGE


    let todos = await Todo.findAll({
        where: {
            title: {
                [Op.like]: `%${lookupValue}%`
            }
        }
    })

    let count = todos.length
    let pageCount = Math.ceil(count / ITEMS_PER_PAGE)

    if(req.query.sortBy == 'title ASC'){

    todos.sort((a, b) => a.title.localeCompare(b.title));
    
}else 
if(req.query.sortBy == 'title DESC'){
   todos = todos.sort((a, b) => b.title.localeCompare(a.title));
}else
if(req.query.sortBy == 'dueDate DESC'){
   todos = todos.sort(function(a,b){

  return new Date(b.dueDate) - new Date(a.dueDate);
});
}else
if(req.query.sortBy == 'dueDate ASC'){
   todos = todos.sort(function(a,b){

        return new Date(a.dueDate) - new Date(b.dueDate);
      })
}else
if(req.query.sortBy == 'createdAt DESC'){
   todos = todos.sort(function(a,b){

        return new Date(b.createdAt) - new Date(a.createdAt);
      })
}


    todos = todos.slice(skip, skip + ITEMS_PER_PAGE)
    
    return{todos, pageCount};

}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    
    if (req.method === "GET") {
        
        const ITEMS_PER_PAGE = 10;
    const page = req.query.page || 1
    const skip = (page-1) * ITEMS_PER_PAGE

    let query = {offset:skip,
      limit : ITEMS_PER_PAGE,
      subQuery:false}
  
    let count = await Todo.count(query)

    let pageCount = Math.ceil(count / ITEMS_PER_PAGE)

    if(req.query.search && req.query.search !== '' && req.query.sortBy && req.query.sortBy !== 'undefined' && req.query.sortBy !== 'unsorted'){
        const sortedSearch = await sortSearch(req, res)
        res.status(200).json(sortedSearch);
     return
    }

    if(req.query.search && req.query.search !== '' ){
     const searchResult = await searchResults(req, res)
     res.status(200).json(searchResult);
     return

  }

  if(req.query.sortBy !== 'undefined' && req.query.sortBy !== 'unsorted'){
       
        const sorted = await getSorted(req, res)
     res.status(200).json(sorted);
        return
  }

  
    const todos = await Todo.findAll(query)
    res.status(200).json({todos, pageCount});
  
  }

  


  if (req.method === "POST") {
    const { title ,
      createdAt ,
      starred ,
      completed,
    dueDate  } = req.body;
    const todo = await Todo.create({
      title ,
      createdAt ,
      starred ,
      completed,
      dueDate
    });
    res.status(201).json(todo);
  }
}

