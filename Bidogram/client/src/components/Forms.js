import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./LoginForm.css";
import { Form } from "react-bootstrap";

class TextInput extends React.Component {
  render() {
    return (
      <div>
        <Form.Control
          onChange={this.props.onChange}
          value={this.props.value}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required
          autoComplete="false"
        />
        <label htmlFor={this.props.name} />
      </div>
    );
  }
}

class TextAreaInput extends React.Component {
  render() {
    return (
      <div>
        <Form.Control
          as={"textarea"}
          rows={"4"}
          onChange={this.props.onChange}
          value={this.props.value}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          required
          autoComplete="false"
        />
        <label htmlFor={this.props.name} />
      </div>
    );
  }
}

export { TextInput, TextAreaInput };
