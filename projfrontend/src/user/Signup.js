import React from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

const SignupForm = () => {
  return (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <form>
          <div className="form-group">
            <label className="text-light">Name</label>
            <input type="text" className="form-control"></input>
          </div>
          <div className="form-group">
            <label className="text-light">Email</label>
            <input type="email" className="form-control"></input>
          </div>
          <div className="form-group">
            <label className="text-light">Password</label>
            <input type="password" className="form-control"></input>
          </div>
          <button className="btn btn-success btn-block">Submit</button>
        </form>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <Base
      title="Register"
      description="Fill in the form to sign up for awesomeness"
    >
      {SignupForm()}
    </Base>
  );
};

export default Signup;
