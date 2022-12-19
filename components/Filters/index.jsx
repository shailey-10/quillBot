import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Filters.module.css'

const Filters = ({ getTodo, setSort, setSearchValue, setSearching, setPage}) => {

  const [searchQuery, setSearchQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [sortBy, setSortBy] = useState()
  const [debouncedSortBy, setDebouncedSortBy] = useState()

  useEffect(() => {
    setSort(sortBy)
    setDebouncedSortBy(sortBy)
  
  }, [sortBy])

  useEffect(() => {
    if(debouncedSortBy){
        getTodo()

      
    }
  }, [debouncedSortBy])

  useEffect(() => {
    setPage(1)
    setSearchValue(searchQuery)
    if(searchQuery !== ''){
      setSearching(true)
    }
    const timeout = setTimeout(() => {
      setDebounced(searchQuery)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchQuery])

  useEffect(() => {
    getTodo()

  }, [debounced])

  return (
    <div className={styles.filter}>
        <input id='todo-search-bar' onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search By Title' type="text" className={styles.searchBar} />
        <select id='todo-sort-dropdown' className={styles.sort} placeholder='Sort By' onChange={(e) => setSortBy(e.target.value)}>
        <option  value="" disabled selected hidden>Sort By</option>
        <option value={'unsorted'}>
            Please Chose Value
          </option>
          <option id='todo-sort-dropdown__title-descending' value={'title DESC'}>
            Title ↓
          </option>
          <option id='todo-sort-dropdown__title-ascending' value={'title ASC'}>
            Title ↑
          </option>
          <option id='todo-sort-dropdown__due-date-descending' value={'dueDate DESC'}>
            Due Date ↓
          </option>
          <option id='todo-sort-dropdown__due-date-ascending' value={'dueDate ASC'}>
            Due Date ↑
          </option>
          <option id='todo-sort-dropdown__created-date-descending' value={'createdAt DESC'}>
            Create Date ↓
          </option>
        </select>
        <Link href = '/activity-log'>
        <p className={styles.log}>Activity Log</p>
        </Link>
    </div>
  )
}

export default Filters