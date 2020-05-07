import React, { useState } from "react";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../services/user";
import { getUser, getUserPending, getUserError } from "../reducers/user";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import "./Main.css";

import UserInfo from "../components/UserInfo";
import NavBar from "../components/NavBar";

import { Modal, Button, Container, ButtonGroup } from "react-bootstrap";
import ChangePassword from "./ChangePassword";

class Account extends React.Component {
  constructor(props) {
    super(props);
    // bindings
    this.handleLogout = this.handleLogout.bind(this);
    this.handleReturn = this.handleReturn.bind(this);

    this.props.fetchUser();
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

  handleReturn() {
    this.props.history.push("/");
  }

  render() {
    return (
      <>
        <NavBar
          status={!this.props.userError}
          handleLogout={this.handleLogout}
        />
        <Container>
          <br />
          {/*<ButtonGroup aria-label="Tab Selection">*/}
          {/*  <Button variant="secondary">Profile</Button>*/}
          {/*  <Button variant="dark">Settings</Button>*/}
          {/*  <Button variant="secondary">Collections</Button>*/}
          {/*</ButtonGroup>*/}
          <div class="card-neodark">
            {!this.props.userPending ? (
              <UserInfo
                status={!this.props.userError}
                user={this.props.userInfo}
                handleLogout={this.handleLogout}
                handleReturn={this.handleReturn}
              />
            ) : (
              <Loader type="Puff" />
            )}
          </div>
        </Container>
      </>
    );
  }
}

function ChangePasswordModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Change Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePassword />
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  userError: getUserError(state),
  userPending: getUserPending(state),
  userInfo: getUser(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser: fetchUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Account);
