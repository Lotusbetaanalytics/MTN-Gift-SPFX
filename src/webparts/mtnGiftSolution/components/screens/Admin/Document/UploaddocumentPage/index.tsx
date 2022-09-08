import * as React from "react";
import { FileUpload, Header, Navigation, Search, Sidebar } from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import * as XLSX from 'xlsx';
import swal from "sweetalert";
import { readFile, utils } from 'xlsx';
// const XLSX = require("xlsx");


const Document = ({history}) => {
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [uploadFile,setUploadedFile] = React.useState("")
  const [upload,setUpload] = React.useState(false)
  const [loading,setLoading]= React.useState(false)
  const [data,setData] = React.useState([])

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log(response);
      setEmployeeEmail(response.Email);
      const userEmail = (response.UserProfileProperties[19].Value)
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
 
  const fileUpload = (e) => {
  //   e.preventDefault();
  //   console.log("yess")
  //   setLoading(true);
   let files = e.target.files
  //     f = files[0];
  //   var allowedExtensions =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //     "application/vnd.ms-excel" ||
  //     ".csv";
  //   if (f.type !== allowedExtensions) {
  //     swal("Warning!", "Invalid File", "warning");
  //   } else {
     
  //         setLoading(false);
  //       }
  //      var reader = new FileReader();
  //     reader.onload = function (e) {
  //       setLoading(true);
  //       var data = reader.result;
  //       let readedData = XLSX.read(data, { type: "binary" });
  //       const wsname = readedData.SheetNames[0];
  //       const ws = readedData.Sheets[wsname] ;
  //       /* Convert array to json*/
  //       const dataParse = XLSX.utils.sheet_to_json(ws);
  //       if (dataParse.length === 0) {
  //         setLoading(false);
  //         swal("Warning!", "Document is empty", "warning");
  //       } else {
  //         console.log(dataParse)
  //         setData(dataParse);
  //         console.log(data)
  //         setUpload(true);

  //    reader.readAsBinaryString(f);
  //   }
  //     }
  const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    console.log(rABS)
    reader.onload = e => {
      /* Parse data */
      console.log(e.target.result,"result")
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(data);
      console.log(data)
    };
   
}
// const readUploadFile = (e) => {
//   e.preventDefault();
//   if (e.target.files) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//           const data = e.target.result;
//           const workbook = XLSX.read(data, { type: "array" });
//           const sheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[sheetName];
//           const json = XLSX.utils.sheet_to_json(worksheet);
//           console.log(json);
//       };
//       reader.readAsArrayBuffer(e.target.files[0]);
//   }
// }
  

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
              console.log("uessss")
              swal("Warning!", "Some Fields are required!", "warning");
            }
          }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      
    } else {
      console.log("i dont understand")
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
            console.log("uessss")
            swal("Warning!", "Some Fields are required!", "warning");
          }
        }
    };
    reader.readAsArrayBuffer(e.target.files[0]);
    
  } else {
    console.log("i dont understand")
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
