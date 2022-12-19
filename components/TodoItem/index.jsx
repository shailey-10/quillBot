import React, {useState} from 'react'
import {FaTrashAlt, FaCopy, FaStar, FaCalendarAlt} from 'react-icons/fa'
import deleteTodo from '../../utils/todos/deleteTodo'
import updateTodo from '../../utils/todos/updateTodo'
import moment from 'moment'
import styles from '../../styles/TodoItem.module.css'
import AddItem from '../AddItem'

const TodoItem = ({todo, getTodo}) => {

    const [editing, setEditing] = useState(false)

    const addTodo = async (todo) => {

        const data = await fetch('api/todos', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              title : todo.title,
              createdAt : todo.date,
              starred : false,
              completed : false,
              dueDate : todo.dueDate
            })
        })
        getTodo()
    }

    

const updateEntry = async (id, currentStatus, feild) => {
        await updateTodo(id, currentStatus, feild)
        getTodo()
    }


    async function deleteItem (id){
      await  deleteTodo(id)
        getTodo()
    }

    function cancelEdit (){
      setEditing(false)
    }

  return (
    <>
    {
      editing ?
      <AddItem getTodo={getTodo}  editing = {true} cancelEdit = {cancelEdit} todo = {todo} />
      :
    <div className={todo.dueDate && new Date(todo.dueDate) < new Date() ? styles.late : styles.todoItem}>
        <div className={styles.todoData}>
          <div>
          <div className={styles.meta}>
        <input className={styles.roundedCheckbox} checked = {todo.completed} type="checkbox" name="" id="" onChange={() => updateEntry(todo.id, todo.completed, 'completed')} />
        <p onClick={() => {setEditing(true)}} className={todo.completed && todo.starred ? styles.double : todo.completed ? styles.completed : todo.starred ? styles.star  : ''} >{todo.title}</p>
        </div>
        {
          todo.dueDate && todo.dueDate !== "Invalid date" &&
        <div className={styles.dueDate}>
          <FaCalendarAlt />
          {moment(todo.dueDate).format('D MMM YYYY, hh:mm A')}
        </div>
        }
        </div>
        </div>
        <div className={styles.action}>
            <FaCopy id={`todo-duplicate-button__${todo.id}`} onClick={() => addTodo(todo)}/>
            <FaStar id = {`todo-star-button__${todo.id}`} onClick={() => {updateEntry(todo.id, todo.starred, 'starred')}} className={todo.starred ? styles.starred : ''} />
            <FaTrashAlt onClick={() => deleteItem(todo.id)}/>
        </div>
    </div>
    }
    </>
  )
}

export default TodoItem