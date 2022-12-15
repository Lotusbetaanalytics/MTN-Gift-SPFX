import * as React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

const Navigation = ({
  document = "",
  config = "",
  report = "",
  pickups = "",
  home = "",
  Dashboard = "",
}) => {
  return (
    <div className={styles.mtn__navigation}>
      <div className={styles.mtn__url}>
        <ul>
          <li className={styles[Dashboard]}>
            <Link to={`/admin/dashboard`}>Dashboard</Link>
          </li>
          <li className={styles[document]}>
            <Link to={`/admin/document`}>Document</Link>
          </li>
          <li className={styles[pickups]}>
            <Link to={`/admin/pickup`}>Pickups</Link>
          </li>
          <li className={styles[report]}>
            <Link to={`/admin/report`}>Report</Link>
          </li>
          <li className={styles[config]}>
            <Link to={`/admin/config`}>Config</Link>
          </li>
          <li className={styles[home]}>
            <Link to={`/home`}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
