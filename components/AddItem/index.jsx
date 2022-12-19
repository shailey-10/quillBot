import React, {useState, useEffect} from 'react'
import{FaRegPlusSquare, FaCheck, FaTimes} from 'react-icons/fa'
import {BiMenuAltLeft} from 'react-icons/bi'
import editTodo from '../../utils/todos/editTodo'
import moment from 'moment'
import styles from '../../styles/AddItem.module.css'

const AddItem = ({getTodo, editing, cancelEdit, todo}) => {

    const [addItem, setAddItem] = useState(false)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState()

    useEffect(() => {
        if(editing){
            setAddItem(true)
            setTitle(todo.title)
            setDate(moment(todo?.dueDate).format('YYYY-MM-DDTHH:mm'))
        }
    }, [])





    const addTodo = async () => {
        if(title === ''){
            alert('Please enter a todo title!')
            return
        }
        const data = await fetch('api/todos', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              title : title,
              completed : false,
              starred : false,
              dueDate : date
            })
        })
        getTodo()
        setAddItem(false)
        setTitle('')
        setDate()
    }

        const enterLog = async (todo, field, act, prevValue, currValue) => {

            const data = await fetch(`api/todos/update/${todo.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                  title : todo.title ,
                  field,
                  act,
                  prevValue,
                  currValue,
                  date : new Date()
                })
            })
        }

    const updateEntry = async (id, title, date) => {
        if(title === ''){
            alert('Please enter a todo title!')
            return
        }
        await editTodo(id, title, date)
          getTodo()
            cancelEdit()
      }
  
      const addLog = async (todo) => {
        if(todo.title === title && moment(todo.dueDate).format('YYYY-MM-DDTHH:mm') == moment(date).format('YYYY-MM-DDTHH:mm')){
            return
        }

        if(todo.title !== title && moment(todo.dueDate).format('YYYY-MM-DDTHH:mm') == moment(date).format('YYYY-MM-DDTHH:mm')){
            enterLog(todo, 'title', 'changed', todo.title, title)
        }

        if(todo.title === title && moment(todo.dueDate).format('YYYY-MM-DDTHH:mm') !== moment(date).format('YYYY-MM-DDTHH:mm')){
            enterLog(todo, 'due date', 'changed', moment(todo.dueDate).format('YYYY-MM-DDTHH:mm'), moment(date).format('YYYY-MM-DDTHH:mm'))
        }

        if(todo.title !== title && moment(todo.dueDate).format('YYYY-MM-DDTHH:mm') !== moment(date).format('YYYY-MM-DDTHH:mm')){
            enterLog(todo, 'title', 'changed', todo.title, title)
            enterLog(todo, 'due date', 'changed', todo.dueDate, date)
        }

       
    }
        

  return (
    <div className={styles.addItem}>
        {
            !addItem ?
            <div className={styles.addState}>
            <FaRegPlusSquare />
            <p onClick = {() => setAddItem(true)}>Create New Item</p>
            </div>
            :
            <div className={styles.addInput}>
                <div className={styles.flex}>
                <span><BiMenuAltLeft /></span>
                <input defaultValue={editing ? todo.title : ''} id = {editing && `todo-edit-due-date-text-field__${todo.id}`} placeholder='Enter Todo Title' type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className={styles.actionItems}>
                <input id = {editing ? `todo-edit-due-date-picker__${todo.id}` : 'new-todo-due-date-picker'} defaultValue={editing ? date : ''} type="datetime-local" name="" onChange={(e) => setDate(moment(e.target.value).format('YYYY-MM-DDTHH:mm'))} />
                <div className={styles.actions}>
                    <FaCheck onClick={editing ? () => {updateEntry(todo.id, title, date); addLog(todo)} : addTodo}/>
                    <FaTimes onClick={editing ? cancelEdit :() => setAddItem(false)} />
                </div>
                </div>
            </div>
        }
    </div>
  )
}

export default AddItem