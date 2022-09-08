import * as React from 'react';
import styles from '../HomeScreen/home.module.scss'
import { useHistory } from "react-router-dom";

const homescreen2 = () => {
    const history = useHistory();

    const admin = () =>{
        history.push("/admin/document")
    }
    const employee = () =>{
        history.push("/employee/location")
    }
    const locationchampion = () =>{
        history.push("/locationchampion")
    }

  return (
    <div className={styles.appContainer}>
        <div className={styles.half}>
            <div className={styles.left}>
            <div className={styles.center_logo}><img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/Vector.png?csf=1&web=1&e=JZV1D3" /></div>
            </div>
        </div>
        <div  className={styles.hal}>
        <div  style={{display:"flex",justifyContent:"center",backgroundColor:"#ffcc00", borderRadius:"60%", height:"50px",width:"100px",alignItems:"center",marginBottom:"10px",fontSize:"1.2rem"}}>Y'ello</div>
        <div className={styles.mtn__logoContainer}>
                
                <div className={styles.text}>
                    <h3>End of the year</h3>
                    <h1>GIFT COLLECTION</h1>
                    <h1>PORTAL</h1>
                </div>
        </div>
        <div className={styles.down}>
        
            <div className={styles.pageCard} onClick={admin} style={{textDecoration:"none"}}>Admin</div>
       
        
            <div className={styles.pageCard} onClick={employee}>Employee</div>
        
       
            <div className={styles.pageCard} onClick={locationchampion}>Location</div>
        

        </div>
       </div>
       
    </div>
  )
}

export default homescreen2