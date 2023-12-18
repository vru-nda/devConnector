import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((item) => (
      <div key={item.id} className={`alert alert-${item.alertType}`}>
        {item.message}
      </div>
    ))
  );
};

Alert.prototype = {
  alerts: PropTypes.array.isRequired,
};

export default Alert;
