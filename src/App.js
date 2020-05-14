import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Search from "./Components/Users/Search";
import Alertmsg from "./Components/Layout/Alert";
import About from "./Components/Pages/About";

class App extends Component {
  state = {
    user: [],
    repos: [],
    user_details: {},
    loading: false,
    alert: { msg: "", type: "" },
  };
  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const user = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   this.setState({ user: user.data, loading: false });
  //   console.log(user);
  // }
  handleSearchuser = async (text) => {
    this.setState({ loading: true });
    const user = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: user.data.items, loading: false });
  };
  clearUser = () => {
    this.setState({ user: [], loading: false });
  };
  getUser = async (username) => {
    this.setState({ loading: true });
    const user = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user_details: user.data, loading: false });
    console.log(user.data);
  };
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const user = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: user.data, loading: false });
    console.log(user.data);
  };
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: { msg: "", type: "" } });
    }, 5000);
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <React.Fragment>
                    <Alertmsg alert={this.state.alert} />
                    <Search
                      handleSearchuser={this.handleSearchuser}
                      clearUser={this.clearUser}
                      showClear={this.state.user.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      user={this.state.user}
                    />
                  </React.Fragment>
                )}
              />
              <Route path="/about" component={About} />
              <Route
                path="/users/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUserRepos={this.getUserRepos}
                    get_user={this.getUser}
                    repos={this.state.repos}
                    user_details={this.state.user_details}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
