import { sp } from "@pnp/sp";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const homescreen2 = () => {
  const [locationchamp, setLocationchamp] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Role eq 'Admin' and Email eq '${response?.Email}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setIsAdmin(true);
          }
        });
      sp.web.lists
        .getByTitle("Admin")
        .items.filter(
          `Role eq 'Location Champion' and Email eq '${response?.Email}'`
        )
        .get()
        .then((response) => {
          if (response.length > 0) {
            setLocationchamp(true);
          }
        });
    });
  }, []);
  const history = useHistory();

  const admin = () => {
    history.push("/admin/dashboard");
  };
  const employee = () => {
    history.push("/employee/location");
  };
  const locationchampion = () => {
    history.push("/locationchampion");
  };

  return (
    <div className="appContainer">
      <div className="half">
        <div className="left">
          <div className="center_logo">
            <img src="https://mtncloud.sharepoint.com/:i:/r/sites/MTNAppDevelopment/mtngiftcollectionsolution/Shared%20Documents/Vector.png?csf=1&web=1&e=JZV1D3" />
          </div>
        </div>
      </div>
      <div className="hal">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#ffcc00",
            borderRadius: "60%",
            height: "50px",
            width: "100px",
            alignItems: "center",
            marginBottom: "10px",
            fontSize: "1.2rem",
          }}
        >
          Y'ello
        </div>
        <div className="mtn__logoContainer">
          <div className="text">
            <h3>End of the year</h3>
            <h1>GIFT COLLECTION</h1>
            <h1>PORTAL</h1>
          </div>
        </div>
        <div className="down">
          <button
            className={isAdmin ? "pageCard" : "no_display"}
            onClick={admin}
          >
            Admin
          </button>

          <button className="pageCard" onClick={employee}>
            Employee
          </button>

          <button
            className={locationchamp ? "pageCard" : "no_display"}
            onClick={locationchampion}
          >
            Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default homescreen2;
