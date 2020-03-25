import React from 'react';

import './signup.css';

const Signup = () => (
  <div class="container">
    <div class="row">
      <div class="col-md-9 mx-auto">
        <div class="card">
          <div class="card-header">
            <h4>Sign Up</h4>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ivan Ivanov"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="example@example.com"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Not less than 8 characters"
                />
              </div>
              <div class="form-group">
                <label for="password">Confirm password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Repeat your password"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Signup;
