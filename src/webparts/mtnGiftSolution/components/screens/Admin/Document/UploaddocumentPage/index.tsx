import * as React from "react";
import {
  FileUpload,
  Header,
  Input,
  Navigation,
  Search,
  Sidebar,
} from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import * as XLSX from "xlsx";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import Modal from "../../../../Containers/Modal";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import { CODE } from "../../../config";

const Document = ({ context }) => {
  const history = useHistory();
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
  const [loading, setLoading] = React.useState(false);
  const [updateStatus, setUpdateStatus] = React.useState("");
  const [modal, setModal] = React.useState(false);
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.Email);
      const userEmail = response.Email;
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
        });
    });
  }, []);

  const modalHandler = () => {
    setModal(true);
  };

  const editHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.add({
        Phone: phone,
        Surname: surname,
        FirstName: FirstName,
        JobTitle: jobTitle,
        Email: Email,
        EmployeeLocation: location,
        PickupLocation: pickupLocation,
        PickupPerson: "Self",
        Division: division,
        Vendor: vendor,
      })
      .then((res) => {
        setModal(false);
        setLoading(false);
        swal("Success", "Success", "success");
        history.push(`/admin/document`);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

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
        console.log(json.length);
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
            console.log("sinsins");
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
  };

  async function getRaterPickerItems(items: any[]) {
    const staff = items[0].secondaryText;

    const URL = `https://prod-nigeria.mtn.ng/ppk/fma/getUserByEmail/${staff}`;
    const httpClientOptions: IHttpClientOptions = {
      headers: {
        "Content-Type": "application/json",
        apiKey: `${CODE}`,
      },
      method: "GET",
      // mode: "no-cors",
    };
    const data = await context.httpClient
      .get(URL, HttpClient.configurations.v1, httpClientOptions)
      .then((response: Response): Promise<HttpClientResponse> => {
        return response.json();
      });
    // if (!data.user) return toast.error("Line Manager not found");
    // setRaterLineManagerName(data.user.lineManagerFullname);
    // setRaterLineManager(data.user.lineManagerEmail);

    setDepartment(data.user.department);
    setEmail(data.user.email);
    const phone = data.user.phoneNumber.substring(4);
    setPhone(`0${phone}`);
    setJobTitle(data.user.jobTitle);
    setDivision(data.user.division);
    setFirstName(data.user.firstName);
    setSurname(data.user.lastName);
    setLocation(data.user.location.substring(13));
  }
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <a
              href="https://mtncloud.sharepoint.com/:x:/r/sites/UATApplications/MTNGift/Shared%20Documents/MTN%20GIFT%20TEMPLATE.xlsx?d=wb4a2a6eababa492a985203271496789c&csf=1&web=1&e=nYRPWZ"
              download
            >
              <button className="gray_mtn">Download Template</button>
            </a>
          </div>
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
                title="Bulk Upload"
                onChange={singleUploadFile}
              />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.imgBox}>
              <img src={require("../../../../assets/upload.png")} alt="" />
            </div>

            <div className={styles.uploadBtn}>
              <button onClick={modalHandler} className="gray_mtn">
                Single Upload
              </button>
              {/* <input type="file" onChange={readUploadFile} multiple/> */}
            </div>
          </div>
        </div>
        <Modal
          isVisible={modal}
          title=""
          size="xl"
          content={
            <form onSubmit={editHandler}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "32% 32% 32%",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: "90%" }} className="mtn__InputContainer">
                  <PeoplePicker
                    context={context}
                    titleText="Search Employee"
                    personSelectionLimit={1}
                    groupName="" // Leave this blank in case you want to filter from all users
                    showtooltip={true}
                    required={true}
                    disabled={false}
                    onChange={getRaterPickerItems}
                    showHiddenInUI={false}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={true}
                    title={"Phone"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required={true}
                    title={"Surname"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required={true}
                    title={"FirstName"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required={true}
                    title={"Job Title"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                    title={"Email"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required={true}
                    title={"Location"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    required={true}
                    title={"Pickup Location"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    required={true}
                    title={"Vendor"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <Input
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    required={true}
                    title={"Division"}
                    readOnly={false}
                    size={"sm"}
                    type={"text"}
                  />
                </div>
                <button
                  style={{ marginTop: "2rem" }}
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
    </div>
  );
};

export default Document;
