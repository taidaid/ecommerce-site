import React from "react";

export default props => {
  if (props.confirmation) {
    return <div className="confirmation">Success!</div>;
  } else {
    return null;
  }
};
