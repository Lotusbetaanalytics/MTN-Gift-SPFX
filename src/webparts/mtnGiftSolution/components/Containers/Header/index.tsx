import * as React from "react";


import styles from "./header.module.scss";
import { useHistory, Link } from "react-router-dom";

const Header = ({ title,userEmail }) => (
  
  

  <div className={styles.mtn__header}>
    <div className={styles.mtn__header__text}>
      <h1>{title}</h1>
    </div>

    <div className={styles.userEmail}>
      <h3>{userEmail}</h3>
    </div>
  </div>

)
export default Header;
