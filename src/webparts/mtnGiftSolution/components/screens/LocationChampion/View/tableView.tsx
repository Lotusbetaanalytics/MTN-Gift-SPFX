import * as React from "react";
import { Header, Input, Navigation, Search, Select, Sidebar } from "../../../Containers";
import styles from "./styles.module.scss"
import { useHistory } from "react-router-dom";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import Text from "../../../Containers/Text";
import Spinner from "../../../Containers/Spinner";



const Document = ({match}) => {
    

    const [query,setQuery] = React.useState("")
    const collectorOption = [{ value: "Self" }, { value: "Delegate" }];
    const proxyOption = [{ value: "By the Portal" }, { value: "By Email" }];
    const history = useHistory()

    const backHanler =() =>{
      history.push("/locationchampion/report")
    }

 


  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [pickupPerson, setPickupPerson] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [modal,setModal] = React.useState(false)
  const [collectionStatus,setCollectionStatus] = React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [proxyType,setProxyType] = React.useState("")

  const [ID,setID] = React.useState("")

  

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
        setEmployeeEmail(response.Email);
      const userEmail = response.Email
  
      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Email eq '${userEmail}'`).get().then((response)=>
        {console.log(response)
          if (response.length === 0  ) {
            sweetAlert("Warning!", "you are not authorize to use this portal", "error");
            history.push("/")
          }
      })
    
    sp.web.lists.getByTitle(`GiftBeneficiaries`).items.filter(`ApprovalStatus eq 'Approved' and Phone eq '${phone}'`).get().then
            ((res) => {
              console.log(res)
                setPhone(res[0].Phone)
                setSurname(res[0].Surname)
                setFirstName(res[0].FirstName)
                setJobTitle(res[0].JobTitle)
                setEmail(res[0].Email)
                setLocation(res[0].EmployeeLocation)
                setPickupLocation(res[0].PickupLocation)
                setPickupPerson(res[0].PickupPerson)
                setDivision(res[0].Division)
                setVendor(res[0].Vendor)
                setID(res[0].ID)
                setCollectionStatus(res[0].CollectionStatus)
                
            })
    })
  }, [phone]);

 
  
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Employees"} userEmail={employeeEmail} />
        <div className="spaceBetween">
        <div></div>
          <div> <button className="mtn__btn mtn__yellow">Report</button></div>
        </div>
        <div className={styles.header}><h3>Employee Details</h3></div>
       {loading ? (<Spinner/>) : <div style={{display:"flex",flexDirection:"column" ,marginBottom:"2rem"}}>
         <Text title={"Phone Number"} value={phone} size={"medium"} />
         <Text title={"Surname"} value={surname} size={"medium"} />
         <Text title={"First Name"} value={FirstName} size={"medium"} />
         <Text title={"Job Title"} value={jobTitle} size={"medium"} />
         <Text title={"Email"} value={Email} size={"medium"} />
         <Text title={"Location"} value={location} size={"medium"} />
         <Text title={"Pickup Location"} value={pickupLocation} size={"medium"} />
         <Text title={"Pickup Person"} value={pickupPerson} size={"medium"} />
         <Text title={"Division"} value={division} size={"medium"} />
         <Text title={"Vendor"} value={vendor} size={"medium"} />
         <Text title={"Collection Status"} value={collectionStatus} size={"medium"} />

          <div style={{width:"40%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"2rem"}}> 
            <button onClick={backHanler}
            className="mtn__btn mtn__white"
            > Back</button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Document;
