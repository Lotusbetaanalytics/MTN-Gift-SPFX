import * as React from "react";
import { Header, Input, Sidebar } from "../../../Containers";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp/presets/all";
import { useHistory } from "react-router-dom";
import Select from "../../../Containers/Select";
import swal from "sweetalert";
import Spinner from "../../../Containers/Spinner";
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";

const Document = () => {
  const history = useHistory();

  const [approvalStatus, setApprovalStatus] = React.useState("");
  const collectorOption = [{ value: "Self" }, { value: "Delegate" }];
  const [loading, setLoading] = React.useState(false);
  const [Location, setLocation] = React.useState("");
  const [Locations, setLocations] = React.useState([]);
  const [Collector, setCollector] = React.useState("");
  const [delegateFullname, setDelegateFullname] = React.useState("");
  const [delegatePhone, setDelegatePhone] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [ID, setID] = React.useState("");
  const [uniqueNumber, setUniqueNumber] = React.useState("");
  const [pickupLocation, setPickupLocation] = React.useState("");
  const [employeeFullname, setEmployeeFullName] = React.useState("");
  const [sms, setSMS] = React.useState("");
  const [pickupPersonSetting, setPickupPersonSetting] = React.useState("");
  const generateSerial = () => {
    var chars = "1234567890",
      serialLength = 5,
      randomSerial = "",
      i,
      randomNumber;
    for (i = 0; i < serialLength; i = i + 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
      setUniqueNumber(randomSerial);
    }
  };

  const backHandler = () => {
    history.push("/employee/location");
  };

  React.useEffect(() => {
    generateSerial();
    setLoading(true);
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.Email);
      setEmployeeFullName(response.DisplayName);
      const userEmail = response.Email;

      sp.web.lists
        .getByTitle(`GiftBeneficiaries`)
        .items.filter(
          `UpdateStatus eq 'Approved' and CollectionStatus eq 'Pending' and Email eq '${userEmail}'`
        )
        .get()
        .then((res) => {
          if (res.length > 0 && res[0].UpdateStatus === "Approved") {
            setLocation(res[0].PickupLocation);
            setCollector(res[0].CollectedBy);
            setApprovalStatus(res[0].ApprovalStatus);
            setCollector(res[0].PickupPerson);
            setDelegateFullname(res[0].DelegateFullname);
            setDelegatePhone(res[0].DelegatePhone);
            setID(res[0].ID);
          } else {
            swal("Warning!", "You are not eligble for a gift!", "error");
            history.push("/");
          }
        });
      sp.web.lists
        .getByTitle(`Notification`)
        .items.get()
        .then((res) => {
          setPickupLocation(res[2].Switch);
          setPickupPersonSetting(res[3].Switch);
          setSMS(res[0].Switch);
        });

      sp.web.lists
        .getByTitle(`Location`)
        .items.get()
        .then((res) => {
          setLocations(res);
          setLoading(false);
        });
    });
  }, []);

  // const updateHandler = (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //     if (Collector === "Delegate" && sms === "On" && delegatePhone.length > 0) {
  //       sp.web.lists
  //     .getByTitle(`GiftBeneficiaries`)
  //     .items.getById(Number(ID))
  //     .update({
  //       ApprovalStatus: "Pending",
  //       UniqueCode: uniqueNumber,
  //       PickupLocation: Location,
  //       PickupPerson: Collector,
  //       DelegateFullname: delegateFullname,
  //       DelegatePhone: delegatePhone,
  //     })
  //     .then((res) => {
  //       const postURL = "https://mtnsms.herokuapp.com/api/v1/sms";
  //       const httpClientOptions = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer iCode`,
  //     },
  //     body: JSON.stringify({
  //       id: `3310232323${ID}`,
  //       message: `Yello ${delegateFullname}, you have been selected as a delegate by ${employeeFullname} to pick up an item,this is your unique code ${uniqueNumber}`,
  //       mobile: [`234${delegatePhone.slice(1)}`],
  //       sender: "MTN",
  //     }),
  //     method: "POST",
  //   }
  //       setLoading(false);
  //       swal("Success", "Successfull", "success");
  //       history.push("/home")
  //       context.httpClient
  //       .post(postURL, HttpClient.configurations.v1, httpClientOptions)
  //       .then((response: Response): Promise<HttpClientResponse> => {
  //         swal("Success", "Success", "success");

  //         return response.json();
  //       })

  //     })
  //     .catch((e) => {
  //       swal("Warning!", "An Error Occured, Try Again!", "error");
  //       console.error(e);
  //     });
  //   }else if (Collector === "Delegate" && sms === "Off" && delegatePhone.length > 0) {
  //     sp.web.lists
  //     .getByTitle(`GiftBeneficiaries`)
  //     .items.getById(Number(ID))
  //     .update({
  //       ApprovalStatus: "Pending",
  //       UniqueCode: uniqueNumber,
  //       PickupLocation: Location,
  //       PickupPerson: Collector,
  //       DelegateFullname: delegateFullname,
  //       DelegatePhone: delegatePhone,
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //       swal("Success", "Success", "success");

  //     })
  //     .catch((e) => {
  //       swal("Warning!", "An Error Occured, Try Again!", "error");
  //       console.error(e);
  //     });
  //   } else {
  //     setDelegateFullname("");
  //     setDelegatePhone("");
  //     sp.web.lists
  //     .getByTitle(`GiftBeneficiaries`)
  //     .items.getById(Number(ID))
  //     .update({
  //       ApprovalStatus: "Pending",
  //       PickupLocation: Location,
  //       PickupPerson: "Self",
  //     })
  //     .then((res) => {
  //       setLoading(false);
  //       swal("Success", "Success", "success");

  //     })
  //     .catch((e) => {
  //       swal("Warning!", "An Error Occured, Try Again!", "error");
  //       console.error(e);
  //     });
  //   }
  // };

  const updateHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    if (Collector === "Delegate" && delegatePhone.length < 11) {
      swal("Warning!", "Delegate phone number not complete", "error");
      setLoading(false);
    } else if (Collector === "Delegate" && delegatePhone.length > 11) {
      swal("Warning!", "Delegate phone number is invalid", "error");
      setLoading(false);
    } else if (Collector === "Delegate" && delegatePhone.length === 11) {
      sp.web.lists
        .getByTitle(`GiftBeneficiaries`)
        .items.getById(Number(ID))
        .update({
          ApprovalStatus: "Pending",
          UniqueCode: uniqueNumber,
          PickupLocation: Location,
          PickupPerson: Collector,
          DelegateFullname: delegateFullname,
          DelegatePhone: delegatePhone,
        })
        .then((res) => {
          setLoading(false);
          history.push("/home");
          swal("Success", "Success", "success");
        })
        .catch((e) => {
          swal("Warning!", "An Error Occured, Try Again!", "error");
          console.error(e);
        });
    } else {
      setDelegateFullname("");
      setDelegatePhone("");
      sp.web.lists
        .getByTitle(`GiftBeneficiaries`)
        .items.getById(Number(ID))
        .update({
          ApprovalStatus: "Pending",
          PickupLocation: Location,
          PickupPerson: "Self",
        })
        .then((res) => {
          setLoading(false);

          swal("Success", "Success", "success");
          history.push("/home");
        })
        .catch((e) => {
          swal("Warning!", "An Error Occured, Try Again!", "error");
          console.error(e);
        });
    }
  };
  const homeHandler = () => {
    history.push("/home");
  };

  return (
    <div className="appContainer">
      <Sidebar />

      <div className="contentsRight">
        <Header title={"Pick up location"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div></div>
          <div>
            <button className="mtn__btn mtn__yellow" onClick={homeHandler}>
              logout
            </button>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              marginTop: "2rem",
            }}
          >
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
            </div>
            <p style={{ marginTop: "1rem" }}>Preffered pickup location</p>

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <Select
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                title={Location}
                value={Location}
                options={Locations}
                filterOption="Title"
                filter={true}
                size="mtn__adult"
              />
            </div>
            <p>Collector</p>
            <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
              <Select
                onChange={(e) => {
                  setCollector(e.target.value);
                }}
                title={Collector}
                value={Collector}
                options={collectorOption}
                size="mtn__adult"
                disabled={pickupPersonSetting === "Off" ? true : false}
              />
            </div>

            {Collector === "Delegate" ? (
              <div>
                <p
                  style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "center",
                    backgroundColor: "rgba(217, 217, 217, 0.42)",
                  }}
                >
                  Delegate Info
                </p>

                <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
                  <Input
                    type={"text"}
                    onChange={(e) => {
                      setDelegateFullname(e.target.value);
                    }}
                    title={"Delegate Fullname"}
                    value={delegateFullname}
                    size="mtn__adult"
                  />
                </div>
                <div style={{ marginTop: "1rem", marginBottom: ".5rem" }}>
                  <Input
                    type={"tel"}
                    onChange={(e) => {
                      setDelegatePhone(e.target.value);
                    }}
                    title={"Delegate Phone number"}
                    value={delegatePhone}
                    size="mtn__adult"
                  />
                </div>
              </div>
            ) : null}
            <div
              style={{
                width: "40%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "2rem",
              }}
            >
              <button
                className="mtn__btn mtn__yellow"
                onClick={updateHandler}
                disabled={approvalStatus === "Approved" ? true : false}
              >
                {" "}
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
