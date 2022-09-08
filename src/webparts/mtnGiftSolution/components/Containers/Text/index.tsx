import * as React from 'react'
import styles from './styles.module.scss'

const Text = ({ title, value, size = "medium" }) => {
    return (
        <div className={`${styles.textContainer} ${styles[size]}`}>
            
            <h5>{title}</h5>
            <p>{value}</p>
        </div>
    )
}

export default Text
