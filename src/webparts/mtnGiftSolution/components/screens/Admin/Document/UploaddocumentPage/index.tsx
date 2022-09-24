import * as React from "react";
import { FileUpload, Header, Navigation, Search, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import * as XLSX from 'xlsx';
import swal from "sweetalert";



const Document = ({history}) => {
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [loading,setLoading]= React.useState(false)
  
  React.useEffect(() => {
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
  }, []);
 

const readUploadFile = (e) => {
    e.preventDefault;
    setLoading(true);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          let data = e.target.result;
          let workbook = XLSX.read(data, { type: "array" });
          let sheetName = workbook.SheetNames[0];
          let worksheet = workbook.Sheets[sheetName];
          let json = XLSX.utils.sheet_to_json(worksheet);
          console.log(json.length)
          for (let i = 0; i < json.length; i++) {
            if (
              json[i]["Surname"] &&
              json[i]["FirstName"] &&
              json[i]["JobTitle"] &&
              json[i]["Email"] &&
              json[i]["EmployeeLocation"] &&
              json[i]["PickupLocation"] &&
              json[i]["Division"] &&
              json[i]["Vendor"] &&
              json[i]["Phone"] 
              
            ) {
              console.log("sinsins")
              sp.web.lists
                .getByTitle("GiftBeneficiaries")
                .items.add({
                  Title: "",
                  Surname: json[i]["Surname"],
                  FirstName: json[i]["FirstName"],
                  JobTitle: json[i]["JobTitle"],
                  Email: json[i]["Email"],
                  EmployeeLocation: json[i]["EmployeeLocation"],
                  PickupLocation: json[i]["PickupLocation"],
                  Division: json[i]["Division"],
                  Vendor: json[i]["Vendor"],
                  Phone: json[i]["Phone"],
                })
                .then((b) => {
                  swal("Success", "Success", "success");
                  setLoading(false);
                  setTimeout(function () {
                    history.push(`/admin/document`);
                  }, 3000);
                });
            } else {
              setLoading(false);
              swal("Warning!", "Some Fields are required!", "warning");
            }
          }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      
    } 
   
}

const singleUploadFile = (e) => {
  e.preventDefault;
  setLoading(true);
  if (e.target.files) {
    const reader = new FileReader();
    reader.onload = (e) => {
        let data = e.target.result;
        let workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json.length)
        for (let i = 0; i < json.length; i++) {
          if (
            json[i]["Surname"] &&
            json[i]["FirstName"] &&
            json[i]["JobTitle"] &&
            json[i]["Email"] &&
            json[i]["EmployeeLocation"] &&
            json[i]["PickupLocation"] &&
            json[i]["Division"] &&
            json[i]["Vendor"] &&
            json[i]["Phone"] 
            
          ) {
            console.log("sinsins")
            sp.web.lists
              .getByTitle("GiftBeneficiaries")
              .items.add({
                Title: "",
                Surname: json[i]["Surname"],
                FirstName: json[i]["FirstName"],
                JobTitle: json[i]["JobTitle"],
                Email: json[i]["Email"],
                EmployeeLocation: json[i]["EmployeeLocation"],
                PickupLocation: json[i]["PickupLocation"],
                Division: json[i]["Division"],
                Vendor: json[i]["Vendor"],
                Phone: json[i]["Phone"],
              })
              .then((b) => {
                swal("Success", "Success", "success");
                setLoading(false);
                setTimeout(function () {
                  history.push(`/admin/document`);
                }, 3000);
              });
          } else {
            setLoading(false);
            swal("Warning!", "Some Fields are required!", "warning");
          }
        }
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    
  }
}
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <Navigation />
        </div>
        <div className="center">
          <div className={styles.imageContainer}>
            <div className={styles.imgBox}>
              <img src={require("../../../../assets/upload.png")} alt="" />
            </div>

            <div className={styles.uploadBtn}>
              <FileUpload
              multiple={false}
                title="single upload"
                onChange={singleUploadFile}
              />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imgBox}>
              <img src={require("../../../../assets/upload.png")} alt="" />
            </div>

            <div className={styles.uploadBtn}>
              <FileUpload
              multiple={true}
                title="bulk upload"
                onChange={readUploadFile}
              />
              {/* <input type="file" onChange={readUploadFile} multiple/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
