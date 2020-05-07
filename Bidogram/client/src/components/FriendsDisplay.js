import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Table, Button } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

class FriendsDisplay extends React.Component {

  render() {
    return (
      <div>
        {!this.props.status ?
          (
            <>
              <h3>Friends</h3>
            </>
          )
          :
          (
            <>
              <h3 style={{ color: "white" }}>Please login to see friends.</h3>
            </>
          )
        }
      </div>
    );
  }
}

export default FriendsDisplay;
