import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import { isLive } from "./isLive";
import { rootReducer } from "./reducers";

import * as serviceWorker from "./serviceWorker";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Home from "./containers/Home";
import Account from "./containers/Account";
import AccountSettings from "./containers/AccountSettings";
import Collections from "./containers/Collections";
import Collection from "./containers/Collection";
import AddCollection from "./containers/AddCollection";
import Friends from "./containers/Friends";
import LivestreamGrid from "./containers/LivestreamGrid";
import Activity from "./containers/Activity";
import Game from "./containers/Game";
import VideoPlayer from "./containers/VideoPlayer";
import Credits from "./containers/Credits";

// initialize redux
const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
console.log(store.getState());

const routing = (
  <Provider store={store}>
    <Router>
      <div className="appBody">
        <Route exact path="/" component={Login} />
        <Route exact path="/isLive" component={isLive} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/account/profile" component={Account} />
        <Route exact path="/account/settings" component={AccountSettings} />
        <Route exact path="/credits" component={Credits} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/games" component={Home} />
        <Route exact path="/collection" component={Collection} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/collections/new" component={AddCollection} />
        <Route exact path="/friends" component={Friends} />
        <Route exact path="/activity" component={Activity} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/livestreams" component={LivestreamGrid} />
        <Route
          exact
          path="/stream/:username"
          render={(props) => <VideoPlayer {...props} />}
        />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
