import * as React from "react";
import { Header, Navigation, Sidebar, TextArea } from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import swal from "sweetalert";
import Select from "../../../Containers/Select";
import Modal from "../../../Containers/Modal";
import Spinner from "../../../Containers/Spinner";

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
      title: "Pick up location",
      field: "PickupLocation",
      type: "string" as const,
    },
  ]);

  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("Pending");
  const [loading, setLoading] = React.useState(false);

  const selectOption = [
    { value: "Pending" },
    { value: "Approved" },
    { value: "Declined" },
  ];
  const selectHandler = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle(`GiftBeneficiaries`)
      .items.filter(`ApprovalStatus eq '${query}'`)
      .getAll()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [query]);

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

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Pickups"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <Select
              onChange={selectHandler}
              title={query}
              value={query}
              options={selectOption}
              size="mtn__adult"
            />
          </div>
          <Navigation pickups="active" />
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
                actionsColumnIndex: -1,

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
                    style: { fontSize: "11px", backgroundColor: "gold" },
                  },
                  tooltip: "View",

                  onClick: (event, rowData) => {
                    history.push(`/admin/pickup/${rowData.ID}`);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    className="mtn__btn_table mtn__black"
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
