import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/set-auth-token";
import { setCurrentUser, logoutUser } from "./store/actions/auth-actions";
import { clearCurrentProfile } from "./store/actions/profile-actions";
import { Navbar, Landing, Footer } from "./components/layout/";
import { Login, Register } from "./components/auth";
import Dashboard from "./components/dashboard/";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile";
import EditProfile from "./components/edit-profile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles';
import Profile from './components/profile';
import store from "./store";
import "./App.css";

// Check for token
const token = localStorage.getItem("jwtToken");
if (token) {
  //Set Auth token header auth
  setAuthToken(token);

  //Decode token and get user data
  const decoded = jwt_decode(token);

  // Set user an isAtuthenticate
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear profile
    store.dispatch(clearCurrentProfile());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
                <PrivateRoute
                  path="/add-experience"
                  component={AddExperience}
                />
                <PrivateRoute
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
