import React from 'react';

import CustomSubmit from '../custom-submit';
import CustomInput from '../custom-input';
import CustomForm from '../custom-form';

import { withRequest } from '../hoc';

const links = [
  { key: 1, ltitle: 'Forget Password?', llink: '/forget-password' },
  { key: 2, ltitle: 'Sign Up', llink: '/signup' },
];

const Login = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-9 mx-auto">
        <CustomForm title={'Log In'} links={links} {...props}>
          <CustomInput name="email" required label="Email" />
          <CustomInput name="password" required label="Password" />
          <CustomSubmit type="submit">Log In</CustomSubmit>
        </CustomForm>
      </div>
    </div>
  </div>
);

export default withRequest('login')(Login);
