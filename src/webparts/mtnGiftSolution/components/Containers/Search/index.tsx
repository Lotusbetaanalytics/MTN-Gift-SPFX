import * as React from 'react'
import styles from "./styles.module.scss"
import { AiOutlineSearch } from 'react-icons/ai'

const SearchWidget = ({ value,onchange,type,placeholder }) => {
  const [search, setSearch] = React.useState("")
  return (
    <div className={styles.pageTitle}>
      <div className={styles.search}>
      <AiOutlineSearch />
        <input type={type} placeholder={placeholder} value={value} onChange={onchange} />
        
      </div>
    </div>
  )
}

export default SearchWidget