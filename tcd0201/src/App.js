import "./App.css";
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import Search from "./components/users/Search";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

class App extends Component {
  state = {
    users: [],
    showLoading: false,
  };

  searchUsers = async (text) => {
    this.setState({ showLoading: true });
    const response = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.setState({ users: response.data.items, showLoading: false });
  };

  clearUsers = (async) => {
    this.setState({ users: [] });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar title="TCD0201React" />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      users={this.state.users}
                    />
                    <Users
                      users={this.state.users}
                      showLoading={this.state.showLoading}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route path="" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
