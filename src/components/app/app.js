import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import DummyChapiService from '../../services/dammy-api';
import Header from '../header';
import Footer from '../footer';
import Menu from '../menu';
import MsgDisplay from '../msg-display';
import MsgInput from '../msg-input';
import Content from '../content';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import Login from '../login';
import Signup from '../signup';

import './app.css';

class App extends React.Component {
  state = {
    chapiService: new DummyChapiService(),
    messages: [],
    error: false,
    loading: true
  };

  updateMsgs = () => {
    this.state.chapiService
      .getAllMessages()
      .then(this.onLoadedMsgs)
      .catch(this.onError);
  };

  onLoadedMsgs = messages => {
    this.setState({
      messages,
      error: false,
      loading: false
    });
  };

  onError = err => {
    this.setState({
      error: true,
      loading: false
    });
  };

  sendMsg = msg => {
    const newMessages = this.state.messages;
    newMessages.push(msg);
    this.setState({
      messages: newMessages
    });
  };

  // Component cycle
  componentDidMount() {
    this.updateMsgs();
  }

  // Component render

  render() {
    const { messages, loading, error } = this.state;
    const maxId = messages.length;

    if (loading) return <Spinner />;
    if (error) return <ErrorIndicator />;

    return (
      <Router>
        <Header />
        <div className="container app-cont">
          <div className="row">
            {/* <Menu></Menu>
            <Content>
              <MsgDisplay messages={messages}></MsgDisplay>
              <MsgInput sendMsg={this.sendMsg} maxId={maxId}></MsgInput>
            </Content> */}
            <Signup />
          </div>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
