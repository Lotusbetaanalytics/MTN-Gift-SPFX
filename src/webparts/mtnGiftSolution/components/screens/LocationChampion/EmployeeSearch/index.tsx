import * as React from "react";
import {  Header, Navigation, Search, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";

import { sp } from "@pnp/sp/presets/all";
import swal from "sweetalert";
import Select from "../../../Containers/Select";
// import Spinner from "../../../../Containers/Spinner";


const Pickup = () => {
   
    const history = useHistory();

  const [query,setQuery] = React.useState("")
    const [employeeEmail,setEmployeeEmail] = React.useState("")

  

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
    });
  }, []);

 
  
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Employees"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <div> <button className="mtn__btn mtn__white">Report</button></div>
        </div>
        
      </div>
    </div>
  );
};

export default Pickup;
