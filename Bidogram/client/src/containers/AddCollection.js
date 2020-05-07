import React from "react";
import { connect } from "react-redux";

// import NumberFormat from 'react-number-format';

import TagsInput from "react-tagsinput";
import "./AddCollection.css";
import { bindActionCreators } from "redux";
import axios from "../services/api";
import * as apiURLS from "../services/apiURL";
import { TextInput, TextAreaInput } from "../components/Forms";
import NavBar from "../components/NavBar";
import { Container, Dropdown, Row, Col, Button, Table, Form} from "react-bootstrap";
import {getGame, getGameError, getGamePending} from "../reducers/game";
import {fetchGame} from "../services/game";

class AddCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      filteredGames: [],
      gameFilter: "",
      games: [],
      tags: [],
      description: "",
      selectedGames : [],
      selectedGameNames : [],
      tagInputProps: { placeholder: "Add a tag" }
    };
    this.handleGameSearchChange = this.handleGameSearchChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getGames = this.getGames.bind(this);

    this.props.fetchGame();
    this.getGames();
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleTagsChange(tagList) {
    this.setState({ tags: tagList });
  }

  handleGameSearchChange(event) {
    this.setState({ gameFilter: event.target.value }, () => this.filterGames());
  }

  handleGameSelect(event) {
    if (event.target.checked) {
      let updatedSelectedGames = [];
      let updatedSelectedGameNames = [];
      if (this.state.selectedGames.indexOf(event.target.id) === -1) {
        updatedSelectedGames = [...this.state.selectedGames, event.target.id];
        updatedSelectedGameNames = [...this.state.selectedGameNames, event.target.name];
      } else {
        updatedSelectedGames = this.state.selectedGames;
        updatedSelectedGameNames = this.state.selectedGameNames;
      }
      this.setState({selectedGames: updatedSelectedGames});
      this.setState({selectedGameNames: updatedSelectedGameNames});
    } else {
      const indValue = this.state.selectedGames.indexOf(event.target.id);
      const indNameValue = this.state.selectedGameNames.indexOf(event.target.name);
      this.setState({
        data: this.state.selectedGames.splice(indValue, 1)
      });
      this.setState({
        data: this.state.selectedGameNames.splice(indNameValue, 1)
      });
    }


    // this.setState({selectedGames: [this.state.selectedGames, game]});
  }

  filterGames () {
    if (this.state.gameFilter === "") {
      this.setState({ filteredGames: this.state.games });
    } else {
      let filterList = this.state.games.filter(item => {
        return item.name.toLowerCase().includes(this.state.gameFilter.toLowerCase());
      });
      this.setState({ filteredGames: filterList });
    }
    // console.log(this.state.filteredGames.map(item => { return item.name}));
  }

  getGames() {
    axios
      .get(apiURLS.GET_GAMES, { withCredentials: true })
      .then(res => {
        this.setState({ games: res.data });
        this.filterGames();
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSubmit() {
    const data = {
      title: this.state.title,
      tags: this.state.tags,
      description: this.state.description,
      games: this.state.selectedGames
    };
    axios
      .post(apiURLS.ADD_COLLECTION, data, { withCredentials: true })
      .then((res) => {
        // window.location.reload();
        this.props.history.push("/collections");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderGames() {
    return this.state.filteredGames.map((game, i) => {
      return (
        <tr key={i}>
          <td><img src={game.cover} class="gameimg"/></td>
          <td>{game.name}</td>
          <td><Form.Check
            type={"checkbox"}
            id={`${game.id}`}
            name={`${game.name}`}
            label={`Add`}
            onChange={this.handleGameSelect}
            checked={this.state.selectedGames.includes(game.id)}
          /></td>
        </tr>
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
          <div class="container-form">
            <Row>
              <Col>
                <h1>New Collection</h1>
                <Dropdown.Divider />
              </Col>
            </Row>
            <Row>
              <Col>
                Title:
                <TextInput
                  onChange={this.handleTitleChange}
                  value={this.state.title}
                  type="text"
                  name="Title"
                  placeholder="Title"
                />
                Tags:
                <br />
                <TagsInput
                  value={this.state.tags}
                  onChange={this.handleTagsChange}
                  inputProps={this.state.tagInputProps}
                  className="react-tagsinput"
                  focusedClassName="react-tagsinput--focused"
                />
                <br />
                Games:
                <TextInput
                  onChange={this.handleGameSearchChange}
                  value={this.state.gameFilter}
                  type="text"
                  name="gameFilter"
                  placeholder="Start typing..."
                />
                <br/>
                <Form>
                <Table bordered variant="dark">
                  <tbody>{this.renderGames()}</tbody>
                </Table>
                </Form>
              </Col>
              <Col>
                Description:
                <TextAreaInput
                  onChange={this.handleDescriptionChange}
                  value={this.state.description}
                  type="text"
                  name="Description"
                  placeholder="Description"
                />
                <br />
                Selected Games:
                <h4>{this.state.selectedGameNames.join(", ")}</h4>
                <br />
                <Button variant="dark" href="/collections">
                  Cancel
                </Button>
                <Button variant="secondary" onClick={this.handleSubmit}>
                  Add
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  gameError: getGameError(state),
  gamePending: getGamePending(state),
  gameInfo: getGame(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({fetchGame: fetchGame}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddCollection);
