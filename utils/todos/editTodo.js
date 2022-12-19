const editTodo = async (id, titleValue, dateValue) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleValue,
        dueDate: dateValue
      }),
    });
    return await response.json();
  };
  
  export default editTodo;
  