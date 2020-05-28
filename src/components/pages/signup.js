import React from 'react';

import CustomInput from '../custom-input';
import CustomSubmit from '../custom-submit';
import CustomForm from '../custom-form';

import { withRequest } from '../hoc';

const Signup = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-9 mx-auto">
        <CustomForm title={'Sign Up'} {...props}>
          <CustomInput name="name" required label="Name" />
          <CustomInput name="email" required label="Email" />
          <CustomInput name="password" required label="Password" />
          <CustomInput
            name="passwordConfirm"
            required
            label="Confirm Password"
          />
          <CustomSubmit type="submit">Sign Up</CustomSubmit>
        </CustomForm>
      </div>
    </div>
  </div>
);

export default withRequest('signup')(Signup);
