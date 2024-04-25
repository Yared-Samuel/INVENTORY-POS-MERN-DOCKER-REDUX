import React from "react";

const ButtonPrimary = (props) => {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      {props.names}
    </button>
  );
};

export default ButtonPrimary;
