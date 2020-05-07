import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import { Table, Row, Col, Dropdown, Image, Tabs, Tab } from "react-bootstrap";

class GameInfo extends React.Component {
  renderSimilarGames() {
    return this.props.game.similarGames.map((game, i) => {
      return (
        <>
          <h6>{game}</h6>
          <Dropdown.Divider />
          </>
        );
    });
  }

  render() {
    return (
      <>
        <div>
          {this.props.game ? (
            <>
              <h2>{this.props.game.name}</h2>
              <Row>
                <Col>
                  <Image src={this.props.game.cover} rounded />
                </Col>
                <Col>
                  <h3>Description</h3>
                  <p>{this.props.game.summary}</p>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Tabs defaultActiveKey="details" id="">
                    <Tab eventKey="details" title="Details">
                      <Table bordered variant="dark">
                        <tbody>
                        <tr>
                          <td>
                            <strong>Genres</strong>
                          </td>
                          <td>{this.props.game.genres.join(", ")}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Platforms</strong>
                          </td>
                          <td>{this.props.game.platforms.join(", ")}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Company(s) involved</strong>
                          </td>
                          <td>
                            {this.props.game.companies
                              .join(", ")}
                          </td>
                        </tr>
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey="stats" title="Stats">
                      <Table bordered variant="dark">
                        <tbody>
                        <tr>
                          <td>
                            <strong>Popularity</strong>
                          </td>
                          <td>{this.props.game.popularity}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Game Modes</strong>
                          </td>
                          <td>{this.props.game.gameModes.join(", ")}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Release Date(s)</strong>
                          </td>
                          <td>
                            {this.props.game.releaseDates
                              .map((date) => date.toLocaleString().split("T")[0])
                              .join(", ")}
                          </td>
                        </tr>
                        </tbody>
                      </Table>
                    </Tab>
                  </Tabs>
                </Col>
                <Col>
                  <h4>Similar Games</h4>
                  <Dropdown.Divider />
                  {this.renderSimilarGames()}
                </Col>
              </Row>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default GameInfo;
