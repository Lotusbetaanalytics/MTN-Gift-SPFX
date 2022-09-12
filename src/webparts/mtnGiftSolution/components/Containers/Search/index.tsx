import * as React from 'react'
import styles from "./styles.module.scss"
import { AiOutlineSearch } from 'react-icons/ai'

const SearchWidget = ({ value,onchange,type,placeholder,click }) => {
  const [search, setSearch] = React.useState("")
  return (
    <div className={styles.pageTitle}>
      <div className={styles.search}>
      <div onClick={click}><AiOutlineSearch /></div>
        <input type={type} placeholder={placeholder} value={value} onChange={onchange} />
        
      </div>
    </div>
  )
}

export default SearchWidget