import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomInput from '../custom-input';
import CustomSubmit from '../custom-submit';
import CustomForm from '../custom-form';
import Avatar from '../avatar';

import { withRequest } from '../hoc';
import { compose } from '../../utils';
import { selectUserProfile } from '../../selectors';

const Profile = (props) => {
  return (
    <div className="container mb-4">
      <div className="row mb-3 mb-md-5">
        <div className="col-md-4 mt-1">
          <Link className="btn btn-outline-dark btn-block shadow-sm" to="/">
            {/* <i className="fas fa-arrow-left" aria-hidden="true"></i> */}
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;Back To Chat
          </Link>
        </div>
        <div className="col-md-4 mt-1">
          <Link
            className="btn btn-outline-primary btn-block shadow-sm"
            to="/update-password"
          >
            {/* <i className="fas fa-lock" aria-hidden="true"></i> */}
            <FontAwesomeIcon icon={faLock} />
            &nbsp;Change Password
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-8 mb-3">
          <CustomForm title={'Edit Profile'} {...props}>
            <CustomInput name="name" required label="Name" />
            <CustomInput name="email" required label="Email" />
            <CustomSubmit>Save Changes</CustomSubmit>
          </CustomForm>
        </div>
        <div className="col-md-6 col-lg-4">
          <Avatar />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userProfile: selectUserProfile,
});

export default compose(
  connect(mapStateToProps),
  withRequest('updateMe')
)(Profile);
