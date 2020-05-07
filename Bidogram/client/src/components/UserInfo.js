import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import { Table, Row, Col, Dropdown } from "react-bootstrap";

class UserInfo extends React.Component {
  render() {
    return (
      <>
        <div>
          {this.props.user ? (
            <>
              <h2>Welcome, {this.props.user.firstName}</h2>
              <Row>
                <Col>
                  <Table bordered variant="dark">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Full Name</strong>
                        </td>
                        <td>
                          {this.props.user.firstName} {this.props.user.lastName}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Email</strong>
                        </td>
                        <td>{this.props.user._id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Date of Birth</strong>
                        </td>
                        <td colSpan="2">
                          {this.props.user.dateOfBirth.split("T")[0]}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Stream Key</strong>
                        </td>
                        <td>{this.props.user.streamKey}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Stream URL</strong>
                        </td>
                        <td>
                        rtmp://138.197.136.193:1935/live
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                <Col>
                </Col>
              </Row>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default UserInfo;
