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
import Spinner from "../../../../Containers/Spinner";
import { displayIcon } from "../../../../Containers/hooks/tableIcon";

const Document = () => {
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
      .items.filter(`UpdateStatus eq 'Pending'`)
      .getAll()
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  const homeHandler = () => {
    history.push("/admin/document/upload");
  };

  const approveHandler = (id) => {
    setLoading(true);
    let selectedIDs = id.map((x) => x.ID);
    let listName = sp.web.lists.getByTitle("GiftBeneficiaries");
    try {
      listName
        .getListItemEntityTypeFullName()
        .then((entityTypeFullName: any) => {
          let createBatchRequest = sp.web.createBatch();

          for (const ItemID of selectedIDs) {
            listName.items
              .getById(ItemID)
              .inBatch(createBatchRequest)
              .update({ UpdateStatus: `Approved` }, "*", entityTypeFullName);
          }

          createBatchRequest
            .execute()
            .then((createResponse: any) => {
              console.log("All Item Updated");
              setLoading(false);
              sp.web.lists
                .getByTitle(`GiftBeneficiaries`)
                .items.filter(`UpdateStatus eq '${query}'`)
                .getAll()
                .then((res) => {
                  setData(res);
                  setLoading(false);
                });
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteHandler = (id) => {
    setLoading(true);
    let selectedIDs = id.map((x) => x.ID);
    let listName = sp.web.lists.getByTitle("GiftBeneficiaries");
    try {
      listName
        .getListItemEntityTypeFullName()
        .then((entityTypeFullName: any) => {
          let deleteBacthRequest = sp.web.createBatch();

          for (const ItemID of selectedIDs) {
            listName.items
              .getById(ItemID)
              .inBatch(deleteBacthRequest)
              .recycle()
              .then((r) => {
                console.log("Moved on Recyle bin");
              });
          }

          deleteBacthRequest
            .execute()
            .then((deleteResponse: any) => {
              console.log("All items Moved on Recyle bin");
              setLoading(false);
              sp.web.lists
                .getByTitle(`GiftBeneficiaries`)
                .items.filter(`UpdateStatus eq '${query}'`)
                .getAll()
                .then((res) => {
                  setData(res);
                  setLoading(false);
                });
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Document"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <button className="mtn__btn mtn__yellow" onClick={homeHandler}>
              Add Employee
            </button>
          </div>
          <Navigation document="active" />
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
                selection: true,
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
                    history.push(`/admin/document/${rowData[0].ID}`);
                  },
                },
                {
                  icon: "visibility",
                  iconProps: { style: { fontSize: "11px", color: "black" } },
                  tooltip: "Select",

                  onClick: (event, rowData) => {
                    approveHandler(rowData);
                  },
                },
                {
                  icon: "visibility",
                  iconProps: { style: { fontSize: "11px", color: "black" } },
                  tooltip: "Delete",

                  onClick: (event, rowData) => {
                    deleteHandler(rowData);
                  },
                },
              ]}
              components={{
                Action: (props) => (
                  <button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    // className="mtn__btn_table mtn__yellow"
                    className={`table_btn`}
                  >
                    {displayIcon(props.action.tooltip)}
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

export default Document;
