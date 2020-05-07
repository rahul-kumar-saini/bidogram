import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { Table, Button } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

class CollectionDisplay extends React.Component {
  renderCollections() {
    return this.props.collectionInfo.map((coll, i) => {
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{coll.title}</td>
          <td>{coll.creator}</td>
          <td>{coll.tags.join(", ")}</td>
          <td>
            <Button variant="dark" href={"/collection?collection=" + coll._id}>
              View
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        {!this.props.status ? (
          <>
          {this.props.collectionInfo.length > 0 ? (
              <>
                <h3>Collections</h3>
                <Table striped bordered variant="dark" hover>
                  <thead>
                  <tr>
                    <th>Collection #</th>
                    <th>Title</th>
                    <th>Creator</th>
                    <th>Tags</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>{this.renderCollections()}</tbody>
                </Table>
              </>
            ) : (
              <>
                <h3 style={{ color: "white" }}>There are no collections!</h3>
              </>
            )}
          <Button variant="dark" href="/collections/new">
            Add a new Collection
          </Button> </>)
          :
          (<>
            <h3 style={{ color: "white" }}>Please login to see collections.</h3>
          </>)}

      </div>
    );
  }
}

export default CollectionDisplay;
