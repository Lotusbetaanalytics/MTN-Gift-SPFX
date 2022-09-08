import * as React from 'react';
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
    <div className="appContainer">
        <div className="half">
            <div className="left">
            <div className="center_logo"><img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/Vector.png?csf=1&web=1&e=JZV1D3" /></div>
            </div>
        </div>
        <div  className="hal">
        <div  style={{display:"flex",justifyContent:"center",backgroundColor:"#ffcc00", borderRadius:"60%", height:"50px",width:"100px",alignItems:"center",marginBottom:"10px",fontSize:"1.2rem"}}>Y'ello</div>
        <div className="mtn__logoContainer">
                
                <div className="text">
                    <h3>End of the year</h3>
                    <h1>GIFT COLLECTION</h1>
                    <h1>PORTAL</h1>
                </div>
        </div>
        <div className="down">
        
            <div className="pageCard" onClick={admin} style={{textDecoration:"none"}}>Admin</div>
       
        
            <div className="pageCard" onClick={employee}>Employee</div>
        
       
            <div className="pageCard" onClick={locationchampion}>Location</div>
        

        </div>
       </div>
       
    </div>
  )
}

export default homescreen2