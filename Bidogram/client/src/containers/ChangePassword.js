import React from "react";
import { connect } from "react-redux";
import "./ChangePassword.css";

import { bindActionCreators } from "redux";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import { Button, Form } from "react-bootstrap";
// import Form from "react-bootstrap/Form";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailSent: false,
      errorResp: "",
      showErrorResp: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitted = this.handleSubmitted.bind(this);
    this.handleSubmitError = this.handleSubmitError.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmitted() {
    this.setState({ emailSent: true });
  }

  handleSubmitError(err) {
    console.log(err);
    if (err.response.status === 500) {
      this.setState({
        errorResp: "500 Internal Error. Please try again later.",
      });
      this.setState({ showErrorResp: true });
    } else if (err.response.status === 404) {
      this.setState({ errorResp: "404 Not Found. Please try again later." });
      this.setState({ showErrorResp: true });
    }
  }

  handleSubmit() {
    const data = {
      email: this.state.email,
    };

    axios
      .put(apiURLS.RESET_PASSWORD, data, { withCredentials: true })
      .then((res) => {
        this.handleSubmitted();
      })
      .catch((err) => {
        this.handleSubmitError(err);
      });
  }

  render() {
    return (
      <div>
        {!this.state.emailSent ? (
          <>
            Insert the email address you wish to send the password reset
            instructions to:
            <Input
              onChange={this.handleEmailChange}
              value={this.state.email}
              type="text"
              name="Email"
              placeholder="example: johnSmith@bidogram.com..."
            />
            {this.state.showErrorResp ? (
              <div className="errorTest">{this.state.errorResp}</div>
            ) : null}
            <br />
            To confirm your password change, press "Submit".
            <br />
            <Button variant="dark" onClick={this.handleSubmit}>
              Submit
            </Button>
          </>
        ) : (
          <>
            <h3>
              Email sent to {this.state.email}. You may now close this window.
            </h3>
          </>
        )}
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <div className="Input">
        <Form.Control
          onChange={this.props.onChange}
          value={this.props.value}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required
          autoComplete="false"
        />
        <label htmlFor={this.props.name}></label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
