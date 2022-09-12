import * as React from "react";
import {
  Header,
  Navigation,
  Search,
  Sidebar,
  TextArea,
} from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import MaterialTable from "material-table";
import swal from "sweetalert";
import Select from "../../../Containers/Select";
import Modal from "../../../Containers/Modal";
import Spinner from "../../../Containers/Spinner";
// import Spinner from "../../../../Containers/Spinner";

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
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [ID, setID] = React.useState(null);
  const [reason, setReason] = React.useState("");
  const [modal, setModal] = React.useState(false);

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
      .get()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, [query]);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeEmail(response.UserProfileProperties[19].Value);
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

  const approveHandler = (rowData) => {
    setID(rowData.ID);
    sp.web.lists
      .getByTitle("GiftBeneficiaries")
      .items.getById(Number(rowData.ID))
      .update({
        ApprovalStatus: "Approved",
        CollectionStatus: "Pending",
      })
      .then((res) => {
        swal("Success", "Pick up approved successfully", "success");
        sp.web.lists
          .getByTitle(`GiftBeneficiaries`)
          .items.filter(`ApprovalStatus eq '${query}'`)
          .get()
          .then((res) => {
            setData(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const declineHandler = (rowData) => {
    setID(rowData.ID);
    setModal(true);
  };

  const reasonHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("GiftBeneficiaries")
      .items.getById(Number(ID))
      .update({
        ApprovalStatus: "Declined",
        DeclinedReason: reason,
      })
      .then((res) => {
        swal("Success", "Pick up declined successfully", "success");
        sp.web.lists
          .getByTitle(`GiftBeneficiaries`)
          .items.filter(`ApprovalStatus eq '${query}'`)
          .get()
          .then((res) => {
            setData(res);
            setModal(false)
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
        setModal(false);
      });
  };
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
                  tooltip: "Approve",

                  onClick: (event, rowData) => {
                    approveHandler(rowData);
                  },
                },
                {
                  icon: "visibility",
                  iconProps: { style: { fontSize: "11px", color: "gold" } },
                  tooltip: "Decline",

                  onClick: (event, rowData) => {
                    declineHandler(rowData);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    className={
                      query === "Declined" || query === "Approved"
                        ? "no_display"
                        : "mtn__btn_table mtn__black"
                    }
                  >
                    {props.action.tooltip}
                  </button>
                ),
              }}
            />
          )}
        </div>
        <Modal
          isVisible={modal}
          title="Reason for decline?"
          size="sm"
          content={
            <form onSubmit={reasonHandler}>
              <div className="mtn__InputFlex">
                <TextArea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required={true}
                />
                <button
                  style={{ marginTop: "1rem" }}
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

export default Pickup;
