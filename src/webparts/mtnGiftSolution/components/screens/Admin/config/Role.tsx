import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Input,
  MenuBar,
  Header,
  Sidebar,
} from "../../../Containers";
import MaterialTable from "material-table";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import Modal from "../../../Containers/Modal";
import Spinner from "../../../Containers/Spinner";
import { HiHome } from "react-icons/Hi";

const Role = () => {
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

  const [columns, setColumns] = React.useState([
    { title: "Role", field: "Title", type: "string" as const },
  ]);

  const [data, setData] = React.useState([]);
  const [Title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setID] = React.useState(null);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Role`)
      .items.get()
      .then((res) => {
        setData(res);
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
    { name: "Roles", url: "/admin/roles", active: true },
    { name: "Location", url: "/admin/location" },
    { name: "Notification", url: "/admin/division" },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true)
    if (!Title) {
      swal("Warning!", "Invalid Role", "error");
      setLoading(false)
    } else {
      sp.web.lists
      .getByTitle("Role")
      .items.filter(`Title eq '${Title}' `)
      .get()
      .then((response) => {
        if (response.length > 0) {
          swal("Warning!", "Role already exist", "error");
          setLoading(false)
        } else  
    sp.web.lists
      .getByTitle("Role")
      .items.add({
        Title: Title,
      })
      .then((res) => {
        setLoading(false)
        setOpen(false);
        swal("Success", "Role added Successfully", "success");
        sp.web.lists
          .getByTitle(`Role`)
          .items.get()
          .then((res) => {
            setData(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      })
    })
  }
  };

  const editHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle("Role")
      .items.getById(id)
      .update({
        Title: Title,
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "Role Edited Successfully", "success");
        sp.web.lists
          .getByTitle(`Role`)
          .items.get()
          .then((res) => {
            setData(res);
          });
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
  };
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      sp.web.lists
        .getByTitle("Role")
        .items.getById(id)
        .delete()
        .then((res) => {
          swal("Success", "Role has been deleted", "success");
          sp.web.lists
            .getByTitle(`Role`)
            .items.get()
            .then((res) => {
              setData(res);
            });
        });
    }
  };
  const openHandler = () => {
    setOpen(true);
    setEdit(false);
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
        <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
        <div className="spaceBetween">
          <div></div>
          <div className="btnContainer right">
            <button
              onClick={openHandler}
              className="mtn__btns mtn__black"
              type="button"
            >
              Add Role
            </button>
          </div>
        </div>
        <div className="center" style={{ marginTop: "50px" }}>
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
                backgroundColor: "#FFCC00",
                color: "black",
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
                tooltip: "Edit",

                onClick: (event, rowData) => {
                  setEdit(true);
                  setOpen(true);
                  setID(rowData.ID);
                  setTitle(rowData.Title);
                },
              },
              {
                icon: "visibility",
                iconProps: { style: { fontSize: "11px", color: "gold" } },
                tooltip: "Delete",

                onClick: (event, rowData) => {
                  deleteHandler(rowData.ID);
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
        </div>
        <Modal
          isVisible={open}
          title="Role"
          size="lg"
          content={
            loading ? (
              <Spinner />
            ) : (
              <div className="mtn__InputFlex">
                <div
                  style={{
                    display: "flex",
                    marginTop: "1rem",
                    marginBottom: ".5rem",
                    width: "100%",
                  }}
                >
                  <Input
                    title="Role"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    size="mtn__adult"
                  />
                </div>

                <button
                  onClick={edit ? editHandler : submitHandler}
                  type="button"
                  className="mtn__btn mtn__yellow"
                >
                  {edit ? "Edit Role" : "Add Role"}
                </button>
              </div>
            )
          }
          onClose={() => setOpen(false)}
          footer=""
        />
      </div>
    </div>
  );
};

export default Role;
