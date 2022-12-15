import * as React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

export const displayIcon = (tooltip) => {
  switch (tooltip) {
    case "Edit":
      return <FaEdit />;
    case "Delete":
      return <FaTrash />;
    case "View":
      return <FaEye />;
    case "Select":
      return <FcCheckmark />;
    default:
  }
};
