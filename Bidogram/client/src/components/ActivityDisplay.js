import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Table, Button } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

class ActivityDisplay extends React.Component {

  render() {
    return (
      <div>
        {!this.props.status ?
          (
            <>
              <h3>Activity</h3>
            </>
          )
          :
          (
            <>
            <h3 style={{ color: "white" }}>Please login to see activity.</h3>
            </>
          )
        }

      </div>
    );
  }
}

export default ActivityDisplay;
