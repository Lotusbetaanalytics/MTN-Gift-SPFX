import * as React from "react";
import {
  Header,
  Input,
  Navigation,
  Search,
  Select,
  Sidebar,
} from "../../../../Containers";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";
import Text from "../../../../Containers/Text";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Spinner from "../../../../Containers/Spinner";
import Modal from "../../../../Containers/Modal";

const Document = ({ match }) => {
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
  const itemID = match.params.id;

  React.useEffect(() => {
    setLoading(true);

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

    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.filter(`ID eq '${itemID}'`)
      .get()
      .then((res) => {
        setPhone(res[0].Phone);
        setSurname(res[0].Surname);
        setFirstName(res[0].FirstName);
        setJobTitle(res[0].JobTitle);
        setEmail(res[0].Email);
        setDepartment(res[0].Department);
        setLocation(res[0].EmployeeLocation);
        setPickupLocation(res[0].PickupLocation);
        setPickupPerson(res[0].PickupPerson);
        setDivision(res[0].Division);
        setVendor(res[0].Vendor);
        setUpdateStatus(res[0].UpdateStatus);
        setLoading(false);
      });
  }, []);

  const modalHandler = () => {
    setModal(true);
  };

  const backHandler = () => {
    history.push("/admin/document");
  };

  const editHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.filter(`Phone eq '${phone}' and UpdateStatus eq 'Approved'`)
      .get()
      .then((res) => {
        sp.web.lists
          .getByTitle(`GiftBeneficiaries`)
          .items.getById(itemID)
          .update({
            Phone: phone,
            Surname: surname,
            FirstName: FirstName,
            JobTitle: jobTitle,
            Email: Email,
            Department: Department,
            EmployeeLocation: location,
            PickupLocation: pickupLocation,
            PickupPerson: pickupPerson,
            Division: division,
            Vendor: vendor,
            UpdateStatus: "Approved",
          })
          .then((res) => {
            setModal(false);
            setLoading(false);
            swal("Success", "Success", "success");
            sp.web.lists
              .getByTitle(`GiftBeneficiaries`)
              .items.filter(`ID eq '${itemID}'`)
              .get()
              .then((res) => {
                setUpdateStatus(res[0].UpdateStatus);
              });
          })
          .catch((e) => {
            swal("Warning!", "An Error Occured, Try Again!", "error");
            console.error(e);
          });
      });
  };

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <Navigation document="active" />
        </div>
        <div className={styles.header}>
          <h3>Employee Details</h3>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "2rem",
            }}
          >
            <Text title={"Phone Number"} value={phone} size={"medium"} />
            <Text title={"Surname"} value={surname} size={"medium"} />
            <Text title={"First Name"} value={FirstName} size={"medium"} />
            <Text title={"Job Title"} value={jobTitle} size={"medium"} />
            <Text title={"Email"} value={Email} size={"medium"} />
            <Text title={"Location"} value={location} size={"medium"} />
            <Text
              title={"Pickup Location"}
              value={pickupLocation}
              size={"medium"}
            />
            <Text
              title={"Pickup Person"}
              value={pickupPerson}
              size={"medium"}
            />
            <Text title={"Division"} value={division} size={"medium"} />
            <Text title={"Vendor"} value={vendor} size={"medium"} />

            <div
              style={{
                width: "40%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <button onClick={backHandler} className="mtn__btn mtn__black">
                {" "}
                Back
              </button>
              <button
                onClick={modalHandler}
                disabled={updateStatus === "Approved" ? true : false}
                className={
                  updateStatus === "Approved"
                    ? "mtn__btn mtn__blackOutline"
                    : "mtn__btn mtn__yellow"
                }
              >
                Update
              </button>
            </div>
          </div>
        )}
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
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required={true}
                title={"Phone"}
                readOnly={false}
                size={"sm"}
                type={"text"}
              />
              <div style={{ marginTop: "1rem" }}>
                <Input
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required={false}
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
                  required={false}
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
                  required={false}
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
                  required={false}
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
                  required={false}
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
                  required={false}
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
                  required={false}
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
                  required={false}
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
  );
};

export default Document;
