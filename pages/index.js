import { useState, useEffect } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Filters from "../components/Filters";
import AddItem from "../components/AddItem";
import TodoItem from "../components/TodoItem";
import NoTodos from "../components/NoTodos";

export default function Home() {

  const [todos, setTodos] = useState()
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0)
  const [searching, setSearching] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [sort, setSort] = useState('unsorted')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getTodo()
}, [page])


const getTodo = async () => {
      await fetch(`api/todos?search=${searchValue}&page=${page}&sortBy=${sort}`)
      .then(response => response.json())
      .then(data => {setTodos(data.todos); setPageCount(data.pageCount); setLoading(false)})
}

const pages = Array(pageCount).fill(0)





    function handlePrevious(){
      setPage((p) => {
        if(p === 1) return p;
        return p -1
      })
    }

    function handleNext(){
      setPage((p) => {
        if(p === pageCount) return p;
        return p + 1
      })
    }

  return (
    <>
    <Head>
        <title>To Do From QuillBot</title>
        <meta name="description" content="Never miss anything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        loading ?
        <div className={styles.container}>
          <Header heading={'Todo List'} />
        <p>Loading...</p>
        </div>
      :
      
        <div className={styles.container}>

      <div className="container">
        <Header heading={'Todo List'} />
  
        <Filters getTodo = {getTodo} setSort = {setSort} setSearchValue = {setSearchValue} setSearching = {setSearching} setTodos = {setTodos} page = {page} setPage ={setPage} setPageCount = {setPageCount} />
        {
          todos && 
          todos.length === 0 ?
          <NoTodos />
          :
          todos.map((todo) => {
            return <TodoItem id = {`todo-${todo.id}`} key={todo.id} todo = {todo} getTodo = {getTodo} />
          })
        }
        <AddItem getTodo = {getTodo} />
      </div>
        <footer className={styles.footer}>
          <button id="todo-pagination-button__previous" disabled = {page === 1} onClick={handlePrevious}>Previous</button>
          <div className={styles.page}>
          {pages &&
            pages.map((pages, i) => {
                return <p key={i} className = {page == i + 1 ? styles.activePage : styles.inActivePage} onClick = {() => setPage(i+1)}> {i + 1}  </p>
            })

          }
          </div>
          <button id="todo-pagination-button__next"  disabled = {page === pageCount || pageCount === 0} onClick={handleNext}>Next</button>
          
        </footer>

    </div>
}
    </>
  );
}
