import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
const ErrorScreen = () => {
    return (
        <div className={styles.errorScreen}>
            <div className="centerError">
            <h1>Error 404</h1>
            <h2>Page Not Found</h2>
            <div className='minimizeBtn'>
                <Link to={'/'} className="mtn__btn mtn__yellow">Go Back</Link>
            </div>

            </div>
           <div className="center_logoError"><img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/gift.png?csf=1&web=1&e=CmE3d5" /></div>
           

        </div>
    )
}

export default ErrorScreen