import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import styles from '../../styles/Header.module.css'

const Header = ({heading}) => {
  return (
    <div className={styles.header}>
        <Image alt='QuillBot' src={logo} /> 
        <h2>{heading}</h2>
    </div>
  )
}

export default Header