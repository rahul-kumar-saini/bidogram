import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import {Table, Row, Col, Dropdown, Card, Button} from "react-bootstrap";
import "./collectionInfo.css";

class CollectionInfo extends React.Component {
  renderGames() {
    return this.props.games.map((game, i) => {
      return (
        <a href={"/game?game=" + game.id}><img src={game.cover} className="collimg"/></a>
      );
    });
  }

  render() {
    return (
      <>
        <div>
          {this.props.collection ? (
            <>
              <h2>{this.props.collection.title}</h2>
              <h5>A collection by {this.props.collection.creator}</h5>
              <br/>
              <h6>{this.props.collection.description}</h6>
              <Row>
                <Col>
                  <Dropdown.Divider />
                  <div>{this.renderGames()}</div>
                  <Dropdown.Divider />
                  <h6>Tags: {this.props.collection.tags.join(", ")}</h6>
                </Col>
              </Row>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default CollectionInfo;
