import React from 'react';

import './login.css';

const Login = () => (
  <div className="container">
    <div className="row mt-5">
      <div className="col-md-8 mx-auto">
        <div className="card">
          <div className="card-header">
            <h4>Account Login</h4>
          </div>
          <div className="card-body">
            <form action="index.html">
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <a href="##">Forget password</a>
            <a href="##">Sifn Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
