import * as React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom';


const AdminCard = ({ title, count, Icon, url }) => {

    return (
        <Link to={url} className={styles.mtn__cards}>
            <div className={`${styles.mtn__icons}`}>
                <Icon />
            </div>
            <div className={styles.mtn__text}>
                <h5>{title}</h5>
                <h3>{count}</h3>

            </div>
        </Link>
    )
}

export default AdminCard