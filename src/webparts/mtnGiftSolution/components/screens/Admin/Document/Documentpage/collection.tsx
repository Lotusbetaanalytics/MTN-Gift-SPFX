import * as React from "react";
import {
  Header,
  Navigation,
  Search,
  Select,
  Sidebar,
} from "../../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";

import swal from "sweetalert";
import Spinner from "../../../../Containers/Spinner";

const CollectionReport = () => {
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
    { title: "Location", field: "EmployeeLocation", type: "string" as const },
    {
      title: "Pickup Location",
      field: "PickupLocation",
      type: "string" as const,
    },
    { title: "Pickup Person", field: "PickupPerson", type: "string" as const },
    { title: "Division", field: "Division", type: "string" as const },
    { title: "Vendor", field: "Vendor", type: "string" as const },
    { title: "Upadate Staus", field: "UpdateStatus", type: "string" as const },
  ]);

  const [employeeEmail, setEmployeeEmail] = React.useState("");

  const [data, setData] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [id, setID] = React.useState(null);
  const [query, setQuery] = React.useState("Pending");

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.Email);
      const userEmail = response.Email;
      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Role eq 'Admin' and Email eq '${userEmail}'`)
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
        });
    });
  }, []);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.filter(`CollectionStatus eq '${query}'`)
      .getAll()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [query]);

  const homeHandler = () => {
    history.push("/admin/document/upload");
  };

  const selectOption = [{ value: "Pending" }, { value: "Collected" }];

  const selectHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Report"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <button className="mtn__btn mtn__yellow" onClick={homeHandler}>
              Add Employee
            </button>
          </div>
          <Navigation report="active" />
        </div>
        <div style={{ width: "120px", marginTop: "30px" }}>
          <Select
            onChange={selectHandler}
            title={query}
            value={query}
            options={selectOption}
            size="mtn__adult"
          />
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
                  iconProps: {
                    style: {
                      fontSize: "11px",
                      color: "gold",
                      marginBottom: "30px",
                    },
                  },
                  tooltip: "View",

                  onClick: (event, rowData) => {
                    history.push(`/admin/document/${rowData.ID}`);
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

export default CollectionReport;
