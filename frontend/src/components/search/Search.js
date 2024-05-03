import React from 'react'
import styles from "./Search.module.css"
import { BiSearch } from 'react-icons/bi'

const Search = ({value, onChange}) => {
  return (
    <div className={styles.search}>
        <BiSearch color='green' className={styles.icon} size={18} />
        <input type='text' placeholder='Search' value={value} onChange={onChange} />
    </div>
  )
}

export default Search