import * as React from "react";
import {
  Header,
  Navigation,
  Search,
  Select,
  Sidebar,
} from "../../../Containers";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import {
  AiOutlineFileDone,
  AiOutlineException,
  AiFillDatabase,
} from "react-icons/ai";
import swal from "sweetalert";
import Chart from "../../../Containers/Chart";
import AdminCard from "../../../Containers/AdminCard";
import Spinner from "../../../Containers/Spinner";

const Dashboard = () => {
  const history = useHistory();

  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [pending, setPending] = React.useState(0);
  const [completed, setCompleted] = React.useState(0);

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
      .items.get()
      .then((res) => {
        setTotal(res.length);
        const pend = res.filter((x) => x.CollectionStatus === "Pending");
        const comp = res.filter((x) => x.CollectionStatus === "Collected");
        setPending(pend.length);
        setCompleted(comp.length);
        setLoading(false);
      });
  }, []);

  const homeHandler = () => {
    history.push("/admin/document/upload");
  };

  return (
    <div className="appContainer">
      <Sidebar />
      <div className="contentsRight">
        <Header title={"Dashboard"} userEmail={employeeEmail} />
        <div className="spaceBetween">
          <div>
            <button className="mtn__btn mtn__yellow" onClick={homeHandler}>
              Add Employee
            </button>
          </div>
          <Navigation Dashboard="active" />
        </div>
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="cardContainer">
                <AdminCard
                  title="Total Uploads"
                  Icon={AiFillDatabase}
                  url="/admin/total-upload"
                  count={total}
                />
                <AdminCard
                  title="Pending Collection"
                  Icon={AiOutlineException}
                  url="/admin/collection-report"
                  count={pending}
                />
                <AdminCard
                  title="Collected"
                  Icon={AiOutlineFileDone}
                  url="/admin/report"
                  count={completed}
                />
              </div>
              <div>
                <Chart pending={pending} completed={completed} total={total} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
