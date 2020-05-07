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
import GameInfo from "../components/GameInfo";

import { Container } from "react-bootstrap";

var qs = require("qs");

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        .game,
    };
    // bindings
    this.handleLogout = this.handleLogout.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.getGameDetails = this.getGameDetails.bind(this);

    this.getGameDetails();

    this.props.fetchUser();
  }

  getGameDetails() {
    axios
      .get(apiURLS.GAME + `${this.state.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        this.setState({ game: res.data });
      })
      .catch((error) => {
        console.error(error);
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
            <GameInfo
              status={!this.props.userError}
              game={this.state.game}
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
