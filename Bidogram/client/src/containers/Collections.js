import React from "react";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../services/user";
import { fetchCollection } from "../services/collection";
import { getUser, getUserPending, getUserError } from "../reducers/user";
import {
  getCollection,
  getCollectionPending,
  getCollectionError,
} from "../reducers/collection";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from 'react-loader-spinner';

import NavBar from "../components/NavBar";

import { Container } from "react-bootstrap";
import CollectionDisplay from "../components/CollectionDisplay";

class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addLocation: false,
    };
    // bindings
    this.handleLogout = this.handleLogout.bind(this);
    this.handleReturn = this.handleReturn.bind(this);

    this.props.fetchCollection();
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
        console.error(err);
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
        <br />
        <Container>
          <CollectionDisplay status={this.props.userError} collectionInfo={this.props.collectionInfo} />
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userError: getUserError(state),
  userPending: getUserPending(state),
  userInfo: getUser(state),
  collectionError: getCollectionError(state),
  collectionPending: getCollectionPending(state),
  collectionInfo: getCollection(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser: fetchUser,
      fetchCollection: fetchCollection,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
