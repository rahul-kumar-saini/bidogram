import axios from "../services/api";
import * as apiURLS from "../services/apiURL";
import React from "react";
import "font-awesome/css/font-awesome.min.css";
// import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";

import Logo from "./Logo";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios
      .get(apiURLS.SIGNOUT, { withCredentials: true })
      .then((res) => {
        console.log("Sign out successful");
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("Sign out failed");
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/home">
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {this.props.status ? (
                <>
                  <NavDropdown title="Your Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/account/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/account/settings">
                      Settings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={
                        this.props.handleLogout
                          ? this.props.handleLogout
                          : this.handleLogout
                      }
                    >
                      Sign Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/Signup">Create Account</Nav.Link>
                  <Nav.Link href="/">Sign In</Nav.Link>
                </>
              )}
              <Nav.Link href="/games"><i className="fa fa-gamepad" aria-hidden="true" /> Games</Nav.Link>
              <Nav.Link href="/collections"><i className="fa fa-list" aria-hidden="true" /> Collections</Nav.Link>
              {/*<Nav.Link href="/friends"><i className="fa fa-users" aria-hidden="true" /> Friends</Nav.Link>*/}
              {/*<Nav.Link href="/activity"><i className="fa fa-line-chart" aria-hidden="true" /> Activity</Nav.Link>*/}
              <Nav.Link href="/livestreams"><i className="fa fa-video-camera" aria-hidden="true" /> Live Streams</Nav.Link>
              <Nav.Link href="/credits"><i className="fa fa-address-book" aria-hidden="true" /> Credits</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
