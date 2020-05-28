import React from 'react';

import CustomInput from '../custom-input';
import CustomSubmit from '../custom-submit';
import CustomForm from '../custom-form';

import { withRequest } from '../hoc';

const ForgetPass = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-9 mx-auto">
        <CustomForm title={'Please Enter Your Email'} {...props}>
          <p className="mb-4">
            We'll send you an email with link to reset your password. Please
            make sure it's the same email adress which you used for signing up.
          </p>
          <CustomInput name="email" required label="Email" />
          <CustomSubmit type="submit">Request Email</CustomSubmit>
        </CustomForm>
      </div>
    </div>
  </div>
);

// const handleSubmit = () => {
//   showPopup('Link have been sent to your email address')(Popup);
// };

const message = 'Link have been sent to your email address';

export default withRequest('forgetPassword', message)(ForgetPass);
