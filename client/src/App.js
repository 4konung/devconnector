import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar, Landing, Footer } from "./components/layout/";
import { Login, Register } from "./components/auth";
import "./App.css";

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
