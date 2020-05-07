import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../services/user";
import { getUser, getUserPending, getUserError } from "../reducers/user";

import axios from "../services/api";
import { USER_STREAM_KEY, LIVSTREAM_HOST } from "../services/apiURL";
import NavBar from "../components/NavBar";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stream: false,
      options: null,
    };
    this.props.fetchUser();
  }

  componentDidMount() {
    axios
      .get(USER_STREAM_KEY, {
        params: {
          username: this.props.match.params.username,
        },
      })
      .then((res) => {
        this.setState(
          {
            stream: true,
            options: {
              autoplay: true,
              controls: true,
              sources: [
                {
                  src:
                    LIVSTREAM_HOST +
                    "8888" +
                    "/live/" +
                    res.data.streamKey +
                    "/index.m3u8",
                  type: "application/x-mpegURL",
                },
              ],
              fluid: false,
              width: 1080,
              height: 720,
            },
          },
          () => {
            this.player = videojs(this.videoNode, this.state.options);
          }
        );
      });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <>
        <NavBar status={!this.props.userError} history={this.props.history} />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
          <small>1) Please wait at least 30 seconds after a stream begins to view it!</small>
          <hr></hr>
          <small>2) Remember to mute your own stream if you are streamer, or you will echo!</small>
            {this.state.stream ? (
              <div data-vjs-player>
                <video
                  ref={(node) => (this.videoNode = node)}
                  className="video-js"
                />
              </div>
            ) : (
              " Loading ... "
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
