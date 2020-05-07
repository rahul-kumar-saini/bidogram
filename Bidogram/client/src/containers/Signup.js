import React from "react";

import axios from "../services/api";
import * as apiURLS from "../services/apiURL";

import "./Signup.css";

import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

import NavBar from "../components/NavBar";
import { Form } from "react-bootstrap";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: new Date(),
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    };
    // Bindings
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onlastNameChange = this.onlastNameChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }

  onlastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }

  handleSignup(e) {
    e.preventDefault();
    // do error checking ...
    ///////
    const data = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dateOfBirth: this.state.date,
    };
    axios
      .post(apiURLS.SIGNUP, data, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        }
      });
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="Signup">
          <Form method="post">
            Email:
            <Input
              onChange={this.onEmailChange}
              value={this.state.email}
              type="text"
              name="email"
              placeholder="email"
            />
            Password:
            <Input
              onChange={this.onPasswordChange}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="password"
            />
            First Name:
            <Input
              onChange={this.onFirstNameChange}
              value={this.state.firstName}
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            Last Name:
            <Input
              onChange={this.onlastNameChange}
              value={this.state.lastName}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <div>Date of Birth:</div>
            <div>
              <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={(date) =>
                  this.setState({ birthdate: date, date })
                } // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
              />
            </div>
            <br />
            <button onClick={this.handleSignup}> Sign Up</button>
          </Form>
        </div>
      </>
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

export default Signup;
