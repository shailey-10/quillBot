import Todo from "../../../db/models/Todo";

export default async function handler(req, res) {
  
  if (req.method === "DELETE") {
    const { slug } = req.query;
    const todo = await Todo.findByPk(slug);
    await todo.destroy();
    res.status(204).end();
  }
  if (req.method === "PATCH") {
    const { slug } = req.query;
    const { starred, completed, title, dueDate } = req.body;
    const todo = await Todo.findByPk(slug);
    if(starred !== undefined){
    todo.starred = starred;
    }
    if(completed !== undefined){
      todo.completed = completed
    }
    if(title !== undefined){
      todo.title = title;
      }
      if(dueDate !== undefined){
        todo.dueDate = dueDate
      }
    await todo.save();
    res.status(200).json(todo);
  }
}
