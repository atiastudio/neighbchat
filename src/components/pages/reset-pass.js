import React from 'react';

import CustomInput from '../custom-input';
import CustomSubmit from '../custom-submit';
import CustomForm from '../custom-form';

import { withRequest } from '../hoc';

const ResetPass = ({ history, location, match, ...props }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9 mx-auto">
          <CustomForm title={'Please Set New Password'} {...props}>
            <CustomInput name="password" required label="Password" />
            <CustomInput
              name="passwordConfirm"
              required
              label="Confirm Password"
            />
            <CustomSubmit type="submit">Set New Password</CustomSubmit>
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default withRequest('resetPassword')(ResetPass);
