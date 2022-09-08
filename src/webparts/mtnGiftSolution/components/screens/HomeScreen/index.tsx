import * as React from 'react';
import styles from './home.module.scss'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
    return <div className={styles.app}>
        <div className={styles.header}>
            <div className={styles.header_logo}>
                    <img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/Vector.png?csf=1&web=1&e=FoxWgB" />
                </div>
        </div>
        <div className={styles.liner}>
        <div className={styles.mtn__banner}>
            <div className={styles.mtn__logoContainer}>
                
                <div className={styles.text}>
                    <h3>End of the year</h3>
                    <h1>GIFT COLLECTION </h1>
                    <h1>PORTAL</h1>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <Link to={`/home`} className="mtn__btn mtn__black">Proceed</Link>
            </div>
        </div>
        </div>
       
    </div>;
};

export default HomeScreen;
