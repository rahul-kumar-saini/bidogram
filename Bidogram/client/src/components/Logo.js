import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

// Fake logo
class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <i className="fa fa-gamepad" aria-hidden="true" />
        <span> Bidogram </span>
      </div>
    );
  }
}

export default Logo;
