import * as React from 'react';
import styles from "../Sidebar/styles.module.scss"

const Sidebar = () => {
  return (
    <div className={styles.app}>
        <div className={styles.logo_container}>
        <div className={styles.header_logo}>
                    <img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/Vector.png?csf=1&web=1&e=FoxWgB" />
                </div>
        </div>
        <div className={styles.mtn_logo}>
        <div className={styles.header_logo2}>
                    <img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/Y%E2%80%99ello.png?csf=1&web=1&e=bQGMVG" />
                </div>
        </div>
    </div>
  )
}

export default Sidebar