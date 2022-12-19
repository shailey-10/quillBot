const starTodo = async (id, currentStatus, feild) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [feild]: !currentStatus,
      }),
    });
    return await response.json();
  };
  
  export default starTodo;
  