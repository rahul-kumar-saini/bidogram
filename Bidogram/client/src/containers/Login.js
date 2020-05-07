import React from "react";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import "./Login.css";
import { LoginForm } from "../components/LoginForm";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      password: "",
      email: "",
      errorResp: "",
      showErrorResp: false,
    };
    // Bindings
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginError(err) {
    console.error(err);
    if (err.response) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      if (err.response.status === 401) {
        this.setState({ errorResp: "User not Found.  Please try again." });
        this.setState({ showErrorResp: true });
      } else if (err.response.status === 500) {
        this.setState({
          errorResp: "500 Internal Error. Please try again later.",
        });
        this.setState({ showErrorResp: true });
      }
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(apiURLS.SIGNIN, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/home");
        }
      })
      .catch((err) => {
        this.handleLoginError(err);
      });
  }

  render() {
    return (
      <div className="Login">
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
          handleLogin={this.handleLogin}
          key="modal"
        />
        <br />
        {this.state.showErrorResp ? (
          <div className="errorTest">{this.state.errorResp}</div>
        ) : null}
      </div>
    );
  }
}

export default Login;
