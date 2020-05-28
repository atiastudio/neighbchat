import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { withChapi } from '../hoc';
import { userUpdatePhoto } from '../../actions';
import { selectUserPhoto } from '../../selectors';

import './avatar.css';

class Avatar extends React.Component {
  // -------------- STATE --------------
  state = {
    photo: '',
    src: '',
    loading: true,
  };

  // -------------- FUNCTIONS --------------
  handleChange = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    this.setState({
      photo: file,
    });

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        src: reader.result,
      });
    };

    if (file) reader.readAsDataURL(file);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { uploadPhoto } = this.props;
    const { photo } = this.state;

    uploadPhoto(photo);

    // this.props.chapiService
    //   .uploadPhoto(this.state.photo)
    //   .then(console.log('This is file: ', this.state.photo))
    //   .then(console.log('File have sent SUCCCESS'))
    //   .catch(this.onError);
  };

  handleDelete = (event) => {
    event.preventDefault();

    const inp = document.querySelector('#myfile');
    inp.value = null;
    this.setState({
      photo: '',
      // src: `https://neibchat-api.herokuapp.com/img/users/${this.props.photo}`,
      src: `http://localhost:8000/img/users/${this.props.photo}`,
    });
  };

  onError = (err) => {
    console.log('THis is error: ', err);
  };

  // -------------- FUNCTIONS --------------
  componentDidMount() {
    const { loading } = this.state;
    if (loading)
      this.setState({
        loading: false,
        // src: `https://neibchat-api.herokuapp.com/img/users/${this.props.photo}`,
        src: `http://localhost:8000/img/users/${this.props.photo}`,
      });
  }

  // -------------- FUNCTIONS --------------
  render() {
    const { photo } = this.state;
    const addDisable = photo ? true : false;
    const labelDisabled = addDisable ? 'disabled' : '';
    return (
      <div className="card">
        <div className="card-header">
          <h4>Edit Avatar</h4>
        </div>
        <div className="card-body">
          <div className="d-flex flex-column align-items-center">
            <img
              src={this.state.src}
              // src={this.state.photo}
              alt="avatar"
              className="card-img-top img-fluid avatar"
            />
            <form className="mt-2">
              <div className="btn-group">
                <label
                  className={`btn btn-primary m-0 ${labelDisabled}`}
                  htmlFor="myfile"
                  // disabled={!addDisable}
                >
                  Choose
                </label>
                <input
                  className="avatar__upload-input "
                  type="file"
                  id="myfile"
                  onChange={this.handleChange}
                  disabled={addDisable}
                />
                <button
                  className={`btn btn-primary`}
                  onClick={this.handleSubmit}
                  disabled={!addDisable}
                >
                  Upload
                </button>
                <button
                  className={`btn btn-primary`}
                  onClick={this.handleDelete}
                  disabled={!addDisable}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  photo: selectUserPhoto,
});

const mapDispatchToProps = (dispatch) => ({
  uploadPhoto: (photo) => dispatch(userUpdatePhoto(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
