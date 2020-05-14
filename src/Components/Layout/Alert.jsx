import React from "react";
const Alertmsg = ({ alert: { msg, type } }) => {
  return (
    msg !== "" && (
      <div className={`alert alert-${type}`}>
        <i className="fas fa-info-circle"></i>
        {msg}
      </div>
    )
  );
};

export default Alertmsg;
