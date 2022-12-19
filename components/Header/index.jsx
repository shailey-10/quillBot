import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Header.module.css'

const Header = ({heading}) => {
  return (
    <div className={styles.header}>
        <Image width={25} height = {25} alt='QuillBot' src='/logo.png' /> 
        <h2>{heading}</h2>
    </div>
  )
}

export default Header