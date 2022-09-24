import * as React from "react";
import {  Header, Input, Navigation, Search, Select, Sidebar, TextArea } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import Text from "../../../../Containers/Text";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "../../../../Containers/Spinner";
import Modal from "../../../../Containers/Modal";




const Document = ({match}) => {
  const history = useHistory()

  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Department, setDepartment] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [pickupPerson, setPickupPerson] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [loading,setLoading]=React.useState(false)
  const [ApprovalStatus,setApprovalStatus] = React.useState("")
  const [modal,setModal] = React.useState(false)
  const [ID, setID] = React.useState(null);
  const [reason, setReason] = React.useState("");
  const itemID = match.params.id
  const [delegateFullname, setDelegateFullname] = React.useState("");
  const [delegatePhone, setDelegatePhone] = React.useState("");
  const [uniqueCode, setUniqueCode] = React.useState(false);

  React.useEffect(() => {
    setLoading(true)
  
      sp.profiles.myProperties.get().then((response) => {
        setEmployeeEmail(response.Email);
        const userEmail = (response.Email)
      sp.web.lists
      .getByTitle("Admin")
      .items.filter(`Role eq 'Admin' and Email eq '${userEmail}'`)
      .get()
      .then((response) => {
       
        if (response.length === 0) {
          sweetAlert(
            "Warning!",
            "you are not authorize to use this portal",
            "error"
          );
          history.push("/");
        }
    })
      });
  
  
    sp.web.lists.getByTitle(`GiftBeneficiaries`).items.filter(`ID eq '${itemID}'`).get().then
            ((res) => {
              
                setPhone(res[0].Phone)
                setSurname(res[0].Surname)
                setFirstName(res[0].FirstName)
                setJobTitle(res[0].JobTitle)
                setEmail(res[0].Email)
                setDepartment(res[0].Department)
                setLocation(res[0].EmployeeLocation)
                setPickupLocation(res[0].PickupLocation)
                setPickupPerson(res[0].PickupPerson)
                setDelegateFullname(res[0].DelegateFullname)
                setDelegatePhone(res[0].DelegatePhone)
                setUniqueCode(res[0].UniqueCode)
                setDivision(res[0].Division)
                setVendor(res[0].Vendor)
                setApprovalStatus(res[0].ApprovalStatus)
                setLoading(false)
            })
  }, []);

  const modalHandler = ()=>{
    setModal(true)
  }

  const backHandler = ()=>{
     history.push("/admin/document")
  }

  const approveHandler = () => {
    sp.web.lists
      .getByTitle("GiftBeneficiaries")
      .items.getById(Number(itemID))
      .update({
        ApprovalStatus: "Approved",
      })
      .then((res) => {
        swal("Success", "Pick up approved successfully", "success");
        sp.web.lists
          .getByTitle(`GiftBeneficiaries`)
          .items.filter(`ID eq '${itemID}'`).get()
          .then((res) => {
            setApprovalStatus(res[0].ApprovalStatus)
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const declineHandler = () => {
    setModal(true);
  };

  const reasonHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("GiftBeneficiaries")
      .items.getById(Number(itemID))
      .update({
        ApprovalStatus: "Declined",
        DeclinedReason: reason,
      })
      .then((res) => {
        swal("Success", "Pick up declined successfully", "success");
        sp.web.lists.getByTitle(`GiftBeneficiaries`).items.filter(`ID eq '${itemID}'`)
          .get()
          .then((res) => {
            setApprovalStatus(res[0].ApprovalStatus)
            setModal(false);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
        setModal(false);
      });
  };

  // const editHandler = (e) =>{
  //   setLoading(true)
  //   e.preventDefault()
  //   sp.web.lists.getByTitle(`GiftBeneficiaries`).items.getById(itemID).update({
  //       Phone:phone,
  //       Surname:surname,
  //       FirstName:FirstName,
  //       JobTitle:jobTitle,
  //       Email:Email,
  //       Department:Department,
  //       EmployeeLocation:location,
  //       PickupLocation:pickupLocation,
  //       PickupPerson:pickupPerson,
  //       Division:division,
  //       Vendor:vendor, 
  //       UpdateStatus: "Approved"
  //   }).then((res) => {
  //     setModal(false)
  //     setLoading(false)
  //       swal("Success", "Success", "success");
  //       sp.web.lists.getByTitle(`GiftBeneficiaries`).items.filter(`ID eq '${itemID}'`).get().then
  //       ((res) => {
  //         setUpdateStatus(res[0].UpdateStatus)
  //       })
  //   }).catch((e) => {
  //       swal("Warning!", "An Error Occured, Try Again!", "error");
  //       console.error(e);
  //   });
  // }

  
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <Navigation document="active" />
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
         {pickupPerson === "Delegate" ? (
            <div>
              <Text
                title={"Delegate Fullname"}
                value={delegateFullname}
                size={"medium"}
              />
              <Text
                title={"Delegate Phone number"}
                value={delegatePhone}
                size={"medium"}
              />
              <Text
                title={"Unique Code"}
                value={uniqueCode}
                size={"medium"}
              />
            </div>
          ) : null}
         <Text title={"Division"} value={division} size={"medium"} />
         <Text title={"Vendor"} value={vendor} size={"medium"} />

          <div style={{width:"40%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"2rem"}}> 
          <button onClick={declineHandler} disabled={ApprovalStatus === "Approved" || ApprovalStatus === "Declined"  ? true : false} className="mtn__btn mtn__black"> Reject</button>
            <button onClick={approveHandler}  disabled={ApprovalStatus === "Approved" || ApprovalStatus === "Declined" ? true : false} className= {ApprovalStatus === "Approved" ? "mtn__btn mtn__blackOutline" : "mtn__btn mtn__yellow"}> 
            Approve
            </button>
          </div>
        </div>}
      </div>
      <Modal
          isVisible={modal}
          title="Reason for decline?"
          size="sm"
          content={
            <form onSubmit={reasonHandler}>
              <div className="mtn__InputFlex">
                <TextArea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required={true}
                />
                <button
                  style={{ marginTop: "1rem" }}
                  type="submit"
                  className="mtn__btn mtn__yellow"
                >
                  Submit
                </button>
              </div>
            </form>
          }
          onClose={() => setModal(false)}
          footer=""
        />
    </div>
  );
};

export default Document;
