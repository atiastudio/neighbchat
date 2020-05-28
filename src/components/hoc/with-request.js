import React from 'react';
import { connect } from 'react-redux';

import { userRequested } from '../../actions';

import Spinner from '../spinner';

const withRequest = (endpoint, message) => (Wrapped) => {
  class WithRequest extends React.Component {
    // --------- STATE ---------
    state = {
      body: {},
      loading: true,
      token: '',
    };

    // --------- FUNCTIONS ---------
    handleChange = (event) => {
      const { name, value } = event.target;

      this.setState((prevState, prevProps) => ({
        body: { ...prevState.body, [name]: value },
      }));
    };

    handleSubmit = (event) => {
      event.preventDefault();

      const { body, token } = this.state;
      this.props.fetchUser({ reqParams: [endpoint, body, token], message });
    };

    // --------- Life cycle ---------
    componentDidMount() {
      const { userProfile, match } = this.props;
      // Set token
      if (match) {
        this.setState({ token: match.params.token });
      }

      // Fulfill default values for form
      const email = userProfile ? userProfile.email : '';
      const name = userProfile ? userProfile.name : '';
      if (name) this.setState({ body: { email, name } });
      this.setState({ loading: false });
    }

    // --------- RENDER ---------
    render() {
      const { body, loading } = this.state;

      if (loading) return <Spinner />;

      return (
        <Wrapped
          body={body}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          {...this.props}
        />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    fetchUser: (endpoint, body, token) =>
      dispatch(userRequested(endpoint, body, token)),
  });

  return connect(null, mapDispatchToProps)(WithRequest);
};

export default withRequest;
