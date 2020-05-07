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

import {Container, Table} from "react-bootstrap";

var qs = require("qs");

class Credits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
        .game,
    };
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
          <div className="card-neodark">
            <h1>Credits</h1>
            <Table bordered variant="dark">
              <tbody>
              <tr>
                <td>
                  <a href={"https://www.npmjs.com/package/axios"}><strong>Axios</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://fontawesome.com/"}><strong>FontAwesome</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://www.npmjs.com/package/qs"}><strong>qs</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://reactjs.org/"}><strong>React</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://react-bootstrap.github.io/"}><strong>React Bootstrap</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://www.npmjs.com/package/react-tagsinput"}><strong>React-tagsinput</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://redux.js.org/"}><strong>Redux</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://www.npmjs.com/package/helmet"}><strong>helmet</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://nodemailer.com/about/"}><strong>nodemailer</strong></a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href={"https://videojs.com/"}><strong>video.js</strong></a>
                </td>
              </tr>
              </tbody>
            </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
