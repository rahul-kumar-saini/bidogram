import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./LoginForm.css";
import NavBar from "./NavBar";
import { Form, Button } from "react-bootstrap";
//import Button from 'react-bootstrap/button';
import Logo from "./Logo";

// TOOK IT FROM HERE
// https://codepen.io/Lakston/pen/XjAQdP

class LoginForm extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="Modal">
          <br />
          <h1>
            <Logo />
          </h1>
          <br />
          <form method="post">
            <Input
              onChange={this.props.onEmailChange}
              value={this.props.email}
              type="text"
              name="email"
              placeholder="email"
            />
            <Input
              onChange={this.props.onPasswordChange}
              value={this.props.password}
              type="password"
              name="password"
              placeholder="password"
            />
            <Button variant="dark" onClick={this.props.handleLogin}>
              {" "}
              Sign In
            </Button>
          </form>
        </div>
      </>
    );
  }
}

// Generic input field
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

export { LoginForm };
