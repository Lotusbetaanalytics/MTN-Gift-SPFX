import * as React from "react";
import { Header, Sidebar } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import Spinner from "../../../Containers/Spinner";
import { HiHome } from "react-icons/Hi";

const Pickup = () => {
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

  const [columns, setColumns] = React.useState([
    { title: "Phone Number", field: "Phone", type: "string" as const },
    {
      title: "Surname",
      field: "Surname",
      type: "string" as const,
    },
    {
      title: "First Name",
      field: "FirstName",
      type: "string" as const,
    },
    {
      title: "Job Title",
      field: "JobTitle",
      type: "string" as const,
    },
    { title: "Email", field: "Email", type: "string" as const },
    {
      title: "Pickup Location",
      field: "PickupLocation",
      type: "string" as const,
    },
    { title: "Location", field: "Location", type: "string" as const },
    { title: "Pickup Person", field: "PickupPerson", type: "string" as const },
    { title: "Division", field: "Division", type: "string" as const },
    { title: "Vendor", field: "Vendor", type: "string" as const },
    { title: "Date", field: "Date", type: "string" as const },
    {
      title: "Time",
      field: "Time",
      type: "time" as const,
      sortMethod: (a, b) => {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
        return b > a ? 1 : -1;
      },
    },
  ]);

  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const homeHandler = () => {
    history.push("/locationchampion");
  };

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.Email);
      const userEmail = response.Email;

      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Role eq 'Location Champion' and Email eq '${userEmail}'`)
        .getAll()
        .then((response) => {
          if (response.length === 0) {
            sweetAlert(
              "Warning!",
              "you are not authorize to use this portal",
              "error"
            );
            history.push("/");
          }

          sp.web.lists
            .getByTitle(`Report`)
            .items.get()
            .then((res) => {
              console.log(res);
              setData(res);
              setLoading(false);
            });
        });
    });
  }, []);

  const home = () => {
    history.push("/home");
  };
  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Reports"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <div className="iconBtn" onClick={homeHandler}>
              {" "}
              <HiHome />
            </div>
          </div>
          <div>
            {" "}
            <button onClick={home} className="mtn__btn mtn__yellow">
              Logout
            </button>{" "}
          </div>
        </div>
        <div className="center" style={{ marginTop: "50px" }}>
          {loading ? (
            <Spinner />
          ) : (
            <MaterialTable
              title=""
              columns={columns}
              data={data}
              options={{
                exportButton: true,
                filtering: true,
                actionsCellStyle: {
                  backgroundColor: "none",
                  color: "#FF00dd",
                },

                headerStyle: {
                  backgroundColor: "black",
                  color: "white",
                  paddingLeft: "10px",
                },
                rowStyle: {
                  fontSize: 13,
                },
              }}
              style={{
                boxShadow: "none",
                width: "100%",
                background: "none",
                fontSize: "13px",
              }}
              // icons={{Add: () => 'Add Row'}}
              actions={[
                {
                  icon: "visibility",
                  iconProps: { style: { fontSize: "11px", color: "gold" } },
                  tooltip: "View",

                  onClick: (event, rowData) => {
                    history.push(`/locationchampion/report/view/${rowData.ID}`);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    className="mtn__btn_table mtn__yellow"
                  >
                    {props.action.tooltip}
                  </button>
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Pickup;
