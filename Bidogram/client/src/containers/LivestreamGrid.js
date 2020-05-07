import React from "react";
import Navbar from "../components/NavBar";
import streamingAxios from "../services/liveStreamingapi";
import axios from "../services/api";
import { Link } from "react-router-dom";
import { STREAM_INFO, BACKEND } from './../services/apiURL';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../services/user";
import { getUser, getUserPending, getUserError } from "../reducers/user";

import './LivestreamGrid.css';

class LivestreamGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      noStreams: false,
    };

    this.props.fetchUser();
  }

  componentDidMount() {
    this.checkLiveStreams();
  }

  checkLiveStreams() {
    streamingAxios.get("/api/streams").then((res) => {
      let streams = res.data;
      if (streams.live !== "undefined") {
        this.getStreams(streams["live"]);
      } else {
        this.setState({ noStreams: true });
      }
    });
  }

  getStreams(streams) {
    axios.get(STREAM_INFO, {}).then((res) => {
      this.setState(
        {
          streams: res.data,
          noStreams: res.data.length === 0,
        },
        () => {}
      );
    });
  }

  streams() {
    return this.state.streams.map((stream, index) => {
      return (
        <div
          className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4"
          key={index}
        >
          <span className="live-label">LIVE</span>
          <Link to={'/stream/' + stream._id}>
            <div className="stream-thumbnail">
              <img className="thumbnail-image" src={BACKEND + '/api/livestreams/thumbnail/'}/>
            </div>
          </Link>
          <span className="username">
            <Link to={"/stream/" + stream._id}>{stream._id}</Link>
          </span>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar status={!this.props.userError} history={this.props.history} />
        <div className="container mt-5">
          <h4>Live Streams</h4>
          <small>To set up your own livestream go to profile and find your credentials there!</small>
          <hr className="my-4" />
          <div className="streams row">
            {this.state.noStreams && <h2>NO STREAMS!</h2>}
            {this.streams()}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LivestreamGrid);
