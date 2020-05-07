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
import CollectionInfo from "../components/CollectionInfo";

import {Container, Dropdown} from "react-bootstrap";

var qs = require("qs");

class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        .collection,
      games: []
    };
    // bindings
    this.handleReturn = this.handleReturn.bind(this);
    this.getCollectionDetails = this.getCollectionDetails.bind(this);
    this.getGames = this.getGames.bind(this);

    this.getCollectionDetails();

    this.props.fetchUser();
  }

  getCollectionDetails() {
    axios
      .get(apiURLS.GET_COLLECTION + `${this.state.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ collectionInfo: res.data });
        this.getGames();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getGame(id) {
    axios
      .get(apiURLS.GAME + `${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        let updatedGames = [...this.state.games, res.data];
        this.setState({ games: updatedGames });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getGames() {
    this.state.collectionInfo.games.map((game, i) => {
      this.getGame(game);
    });
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
        <Container>
          <div className="card-neodark">
            <CollectionInfo
              status={!this.props.userError}
              collection={this.state.collectionInfo}
              games={this.state.games}
              handleReturn={this.handleReturn}
            />
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
