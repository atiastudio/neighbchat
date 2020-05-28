import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../header';
import ErrorLine from '../error-line';
import Footer from '../footer';
import Spinner from '../spinner';
import {
  MainPage,
  FrogetPass,
  Login,
  Profile,
  ResetPass,
  Signup,
  UpdatePass,
} from '../pages';

import { userRequested, listenMsgNew } from '../../actions';
import {
  selectUserId,
  selectUserLoading,
  selectUserError,
  selectMsgLoadingInit,
} from '../../selectors';

import './app.css';

class App extends React.Component {
  state = {
    error: false,
    loading: true,
  };

  // Component cycle
  componentDidMount() {
    // console.log('App component did MOUNT!');
    this.props.fetchUser();
    this.setState({ loading: false });
    this.props.listenMsgNew();
  }

  // Component render

  render() {
    const { loading } = this.state;
    if (loading) return <Spinner />;

    const { userId } = this.props;
    const content = !userId ? (
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forget-password" component={FrogetPass} />
        <Route path="/reset-password/:token" component={ResetPass} />
        <Route path="*" component={() => <Redirect to="/login" />} />
      </Switch>
    ) : (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/update-password" component={UpdatePass} />
        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    );

    return (
      <React.Fragment>
        <Header />
        <ErrorLine />
        {content}
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  loading: selectUserLoading,
  error: selectUserError,
  msgLoading: selectMsgLoadingInit,
});

const reqParams = ['getMe'];

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(userRequested({ reqParams })),
  listenMsgNew: () => dispatch(listenMsgNew()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
