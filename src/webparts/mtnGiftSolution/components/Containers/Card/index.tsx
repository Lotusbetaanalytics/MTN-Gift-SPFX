import * as React from "react";
import styles from "./card.module.scss";
const Card = ({ header, children }) => {
  return (
    <div className={styles.card__container}>
      <h1>{header}</h1>
      {children}
    </div>
  );
};

export default Card;
