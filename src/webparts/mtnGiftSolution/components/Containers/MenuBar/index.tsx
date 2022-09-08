import * as React from 'react'
import styles from "./styles.module.scss"
import { Link } from 'react-router-dom'

const MenuBar = ({ menu = [] }) => {
    return (
        <div className={styles.menubar}>
            {
                menu.map((item, i) => (
                    <Link key={i} to={item.url} className={`${styles.menu} ${item.active && styles.active}`}>{item.name}</Link>
                ))
            }


        </div>
    )
}

export default MenuBar