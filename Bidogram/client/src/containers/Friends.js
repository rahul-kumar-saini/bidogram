import React from "react";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../services/user";
import { getUser, getUserPending, getUserError } from "../reducers/user";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from 'react-loader-spinner';

import "./Main.css";

import NavBar from "../components/NavBar";

import { Container } from "react-bootstrap";
import FriendsDisplay from "../components/FriendsDisplay";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    // bindings
    this.handleLogout = this.handleLogout.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.getUsers = this.getUsers.bind(this);

    this.props.fetchUser();
    this.getUsers();
  }

  handleLogout() {
    axios
      .get(apiURLS.SIGNOUT, { withCredentials: true })
      .then((res) => {
        console.log("Sign out successful");
        this.props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
        console.log("Sign out failed");
        this.props.history.push("/");
      });
  }

  handleReturn() {
    this.props.history.push("/");
  }

  getUsers() {
    axios
      .get(apiURLS.GET_USERS, { withCredentials: true })
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <NavBar
          status={!this.props.userError}
          handleLogout={this.handleLogout}
        />
        <br />
        <Container>
          <FriendsDisplay status={this.props.userError} />
        </Container>
      </>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
