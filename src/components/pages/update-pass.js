import React from 'react';

import CustomInput from '../custom-input';
import CustomSubmit from '../custom-submit';
import CustomForm from '../custom-form';

import { withRequest } from '../hoc';

const UpdatePass = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-9 mx-auto">
        <CustomForm title={'Update Password'} {...props}>
          <CustomInput
            name="passwordCurrent"
            required
            label="Current Password"
          />
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

const message = 'Your password has been changed successfully';

export default withRequest('updatePassword', message)(UpdatePass);
