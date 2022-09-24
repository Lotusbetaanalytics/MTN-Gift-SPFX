import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  MenuBar,
  Sidebar,
  Header,
} from "../../../Containers";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { HiHome } from "react-icons/Hi";
const Division = () => {
  // Helpers
  const history = useHistory();

  type IType =
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
  const string: IType = "string";

  
  
  const [email, setEmail] = React.useState("");
  const [smsNotification, setSmsNotification] = React.useState(false);
  const [emailNotification, setEmailNotification] = React.useState(false);
  const [changePickupLocation, setChangePickupLocation] = React.useState(false);
  const [changePickupPerson, setChangePickupPerson] = React.useState(false);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Notification`)
      .items.get()
      .then((res) => {
        setEmailNotification(res[1].Switch);
        if (res[1].Switch === "On") {
          setEmailNotification(true);
        } else {
          setEmailNotification(false);
        }
        setSmsNotification(res[0].Switch);
        if (res[0].Switch === "On") {
          setSmsNotification(true);
        } else {
          setSmsNotification(false);
        }
        setChangePickupLocation(res[2].Switch);
        if (res[2].Switch === "On") {
          setChangePickupLocation(true);
        } else {
          setChangePickupLocation(false);
        }
        setChangePickupPerson(res[3].Switch);
        if (res[3].Switch === "On") {
          setChangePickupPerson(true);
        } else {
          setChangePickupPerson(false);
        }
      });
  }, []);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmail(response.Email);
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

  // Menubar Items
  const menu = [
    { name: "Admin", url: "/admin/config" },
    { name: "Roles", url: "/admin/roles" },
    { name: "Location", url: "/admin/location" },
    { name: "Notification", url: "/admin/division", active: true },
  ];

  const onSmsHandler = (e) => {
    e.preventDefault();

    sp.web.lists
      .getByTitle("Notification")
      .items.getById(1)
      .update({
        Switch: "On",
      })
      .then((res) => {
        swal("Success", "SMS notication Successfully turned on ", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setSmsNotification(res[0].Switch);
            if (res[0].Switch === "On") {
              setSmsNotification(true);
            } else {
              setSmsNotification(false);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const onEmailHandler = (e) => {
    e.preventDefault();

    sp.web.lists
      .getByTitle("Notification")
      .items.getById(2)
      .update({
        Switch: "On",
      })
      .then((res) => {
        swal("Success", "Email notication Successfully turned on ", "success");

        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setSmsNotification(res[1].Switch);
            if (res[1].Switch === "On") {
              setEmailNotification(true);
            } else {
              setEmailNotification(false);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const onPickupHandler = (e) => {
    e.preventDefault();

    sp.web.lists
      .getByTitle("Notification")
      .items.getById(4)
      .update({
        Switch: "On",
      })
      .then((res) => {
        swal("Success", "Delegate Pickup enable", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setChangePickupPerson(res[3].Switch);
            if (res[3].Switch === "On") {
              setChangePickupPerson(true);
            } else {
              setChangePickupPerson(false);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const onLocationHandler = (e) => {
    e.preventDefault();

    sp.web.lists
      .getByTitle("Notification")
      .items.getById(3)
      .update({
        Switch: "On",
      })
      .then((res) => {
        swal("Success", "Pickup location enable", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setChangePickupLocation(res[2].Switch);
            if (res[2].Switch === "On") {
              setChangePickupLocation(true);
            } else {
              setChangePickupLocation(false);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const offSmsHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Notification")
      .items.getById(1)
      .update({
        Switch: "Off",
      })
      .then((res) => {
        swal("Success", "SMS notication Successfully turned off ", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setSmsNotification(res[0].Switch);
            if (res[0].Switch === "Off") {
              setSmsNotification(false);
            } else {
              setSmsNotification(true);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const offEmailHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Notification")
      .items.getById(2)
      .update({
        Switch: "Off",
      })
      .then((res) => {
        swal("Success", "Email notication Successfully turned off ", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setEmailNotification(res[1].Switch);
            if (res[1].Switch === "Off") {
              setEmailNotification(false);
            } else {
              setEmailNotification(true);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const offLocationHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Notification")
      .items.getById(3)
      .update({
        Switch: "Off",
      })
      .then((res) => {
        swal("Success", "Pickup location is disabled ", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setChangePickupLocation(res[2].Switch);
            if (res[2].Switch === "Off") {
              setChangePickupLocation(false);
            } else {
              setChangePickupLocation(true);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const offPickupHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Notification")
      .items.getById(4)
      .update({
        Switch: "Off",
      })
      .then((res) => {
        swal("Success", "Pickup location is disabled ", "success");
        sp.web.lists
          .getByTitle(`Notification`)
          .items.get()
          .then((res) => {
            setChangePickupPerson(res[3].Switch);
            if (res[3].Switch === "Off") {
              setChangePickupPerson(false);
            } else {
              setChangePickupPerson(true);
            }
            console.log(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };

  const homeHandler = () => {
    history.push("/admin/document");
  };

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={email} />
        <div className="spaceBetween">
          <div>
            <MenuBar menu={menu} />
          </div>
          <div>
            <div className="iconBtn" onClick={homeHandler}>
              {" "}
              <HiHome />
            </div>
          </div>
        </div>
        <div
          className="center"
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="space">
            <div style={{ display: "flex", fontSize: "16px" }}>
              SMS Notification
            </div>
            <div
              className={
                smsNotification ? "switchBtn yellow" : "switchBtn gray"
              }
            >
              <div
                className={smsNotification ? "offbtn yellow" : "offbtn white"}
                onClick={offSmsHandler}
              ></div>
              <div
                className={smsNotification ? "onbtn white" : "onbtn gray"}
                onClick={onSmsHandler}
              ></div>
            </div>
          </div>
          <div className="space">
            <div style={{ display: "flex", fontSize: "16px" }}>
              Email Notification
            </div>
            <div
              className={
                emailNotification ? "switchBtn yellow" : "switchBtn gray"
              }
            >
              <div
                className={emailNotification ? "offbtn yellow" : "offbtn white"}
                onClick={offEmailHandler}
              ></div>
              <div
                className={emailNotification ? "onbtn white" : "onbtn gray"}
                onClick={onEmailHandler}
              ></div>
            </div>
          </div>

          <div className="space">
            <div style={{ display: "flex", fontSize: "16px" }}>
              Pickup Location
            </div>
            <div
              className={
                changePickupLocation ? "switchBtn yellow" : "switchBtn gray"
              }
            >
              <div
                className={
                  changePickupLocation ? "offbtn yellow" : "offbtn white"
                }
                onClick={offLocationHandler}
              ></div>
              <div
                className={changePickupLocation ? "onbtn white" : "onbtn gray"}
                onClick={onLocationHandler}
              ></div>
            </div>
          </div>

          <div className="space">
            <div style={{ display: "flex", fontSize: "16px" }}>
              Pickup by delegate
            </div>
            <div
              className={
                changePickupPerson ? "switchBtn yellow" : "switchBtn gray"
              }
            >
              <div
                className={
                  changePickupPerson ? "offbtn yellow" : "offbtn white"
                }
                onClick={offPickupHandler}
              ></div>
              <div
                className={changePickupPerson ? "onbtn white" : "onbtn gray"}
                onClick={onPickupHandler}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Division;
