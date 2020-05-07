import React from "react";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../services/user";
import { fetchCollection } from "../services/collection";
import { fetchGame } from "../services/game";
import { getUser, getUserPending, getUserError } from "../reducers/user";
import {
  getCollection,
  getCollectionPending,
  getCollectionError,
} from "../reducers/collection";
import { getGame, getGamePending, getGameError } from "../reducers/game";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import NavBar from "../components/NavBar";

import "./Home.css";

import {
  Container,
  Col,
  Row,
  Card,
  CardColumns,
  Button,
} from "react-bootstrap";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
    };
    // bindings
    this.handleLogout = this.handleLogout.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.getPopularGames = this.getPopularGames.bind(this);

    this.props.fetchCollection();
    this.props.fetchUser();
    this.props.fetchGame();
    this.getPopularGames();
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

  getPopularGames() {
    axios
      .get(apiURLS.GET_GAMES, { withCredentials: true })
      .then((res) => {
        this.setState({ games: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderGames() {
    return this.state.games.map((game, i) => {
      return (
        <Card bg={"dark"} key={"game_" + i} style={{ width: "200px" }}>
          <Card.Img src={game.cover} />
          <Card.Body>
            <Card.Title>{game.name}</Card.Title>
            <Card.Text>{game.summary.slice(0, 100)}...</Card.Text>
            <Button variant="secondary" href={"/game?game=" + game.id}>
              See Game
            </Button>
          </Card.Body>
        </Card>
      );
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
          <Row>
            <Col>
              <CardColumns>{this.renderGames()}</CardColumns>
            </Col>
            <Col></Col>
          </Row>
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
  gameError: getGameError(state),
  gamePending: getGamePending(state),
  gameInfo: getGame(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser: fetchUser,
      fetchCollection: fetchCollection,
      fetchGame: fetchGame,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
