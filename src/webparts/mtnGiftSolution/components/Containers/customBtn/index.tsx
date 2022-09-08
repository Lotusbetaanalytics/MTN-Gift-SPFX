import * as React from "react";
import styles from "./styles.module.scss";

const CustomBtn = ({ handler, buttonName }) => {
  return (
    <div>
      <button type="button" onClick={handler} className={styles.customBtn}>
        {buttonName}
      </button>
    </div>
  );
};

export default CustomBtn;
