import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import moment from 'moment'
import styles from '../../styles/ActivityLog.module.css'
import Link from 'next/link'

const ActivityLog = () => {

    const [log, setLog] = useState()
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)

    const pages = Array(pageCount).fill(0)

    useEffect(() => {
        getLog()
    }, [page])

    useEffect(() => {
        getLog()
    }, [])



    const getLog = async () => {
            await fetch(`api/log?page=${page}`)
            .then(response => response.json())
            .then(data => {setLog(data.todos); setPageCount(data.pageCount)})
      }

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
    <div className={styles.container}>
        <div className={styles.header}>
        <Header heading = {'Activity Log'} />
        <Link href = '/'>
        <p>Todo</p>
        </Link>
        </div>
        {
            log &&
            log.map((item) => {
                return (
                    <div dateTime={item.date} id={`activity-log-list-item_${item.id}`} className={styles.log} key={item.id}>
                        <div>
                        <h2 id={`activity-log-list-item__title_${item.id}`} >{item.title}</h2>
                        <p> <span id={`activity-log-list-item__change-type_${item.id}`}> {item.act} </span> <span> {item.field} </span> to <span id={`activity-log-list-item__new-value_${item.id}`}> 
                        {item.field === 'due date' ? 
                        moment(item.currValue).format('D MMM YYYY, h:mm A') : item.currValue} </span> from <span id = {`activity-log-list-item__old-value_${item.id}`}> 
                        {item.field === 'due date' ? 
                        moment(item.prevValue).format('D MMM YYYY, h:mm A') : item.prevValue}</span></p>
                        </div>
                       <p id = {`activity-log-list-item__date-time_${item.id}`}> {moment(item.date).format('D MMM YYYY, h:mm A')} </p>
                    </div>
                )
            })
        }
         <footer className={styles.footer}>
          <button id='todo-pagination-button__previous' disabled = {page === 1} onClick={handlePrevious}>Previous</button>
          <div className={styles.page}>
          {pages &&
            pages.map((pages, i) => {
                return <p key={i} className = {page == i + 1 ? styles.activePage : styles.inActivePage} onClick = {() => setPage(i+1)}> {i + 1}  </p>
            })

          }
          </div>
          <button id='todo-pagination-button__next'  disabled = {page === pageCount || pageCount === 0} onClick={handleNext}>Next</button>
          
        </footer>
    </div>
  )
}

export default ActivityLog