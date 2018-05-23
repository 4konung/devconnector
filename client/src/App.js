import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/set-auth-token";
import { setCurrentUser } from "./store/actions/auth-actions";
import { Navbar, Landing, Footer } from "./components/layout/";
import { Login, Register } from "./components/auth";
import store from "./store";
import "./App.css";

// Check for token
const token = localStorage.getItem('jwtToken');
if(token){
  //Set Auth token header auth
  setAuthToken(token);
  //Decode token and get user data
  const decoded = jwt_decode(token);
  // Set user an isAtuthenticate
  store.dispatch(setCurrentUser(decoded));
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
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
