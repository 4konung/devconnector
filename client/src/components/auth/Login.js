import React, { Component } from "react";
import createClassName from "./dynamic-class-names";
const classname = createClassName("form-control form-control-lg");


class Login extends Component {
  initialState = {
    email: '',
    password: '',
    errors: {}
  }
  state = this.initialState;
  
  handleChange = ({target:{name,value}}) => {
    this.setState({
      [name]: value
    })
  }
  
  handleSubmit = event =>{
    event.preventDefault();
    this.setState(this.initialState)
  }

  render() {
    const {handleChange, handleSubmit} = this;
    const {email, password, errors} = this.state;
    const style = {
      email: classname({ "is-invalid": errors.email }),
      password: classname({ "is-invalid": errors.password })
    };
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1
               className="display-4 text-center"
               >Log In</h1>
              <p
               className="lead text-center"
              >Sign in to your DevConnector account</p>
              <form 
                action="dashboard.html"
                onSubmit={handleSubmit}  
              >
                <div className="form-group">
                  <input
                    type="email"
                    className={style.email}
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={style.password}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
