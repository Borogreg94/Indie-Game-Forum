import React from 'react';
import './LogIn.css';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };

    this.closeWindow = this.closeWindow.bind(this);
    this.input = this.input.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  closeWindow() {
    this.props.closeLogInWindow();
  }

  input(e) {
    if (e.target.className === 'logInUsername') {
      this.setState({ username: e.target.value });
    } else if (e.target.className === 'logInPassword') {
      this.setState({ password: e.target.value });
    }
  }

  logIn() {
    this.props.logIn(this.state.username, this.state.password);
  }

  render() {
    return (
      <>
        <div className="logInBackground"></div>
        <div className="logInWindow">
          <button className="closeLogInWindow" onClick={this.closeWindow}>
            X
          </button>
          <h2>Log In</h2>
          <h3>Username: </h3>
          <input className="logInUsername" onChange={this.input}></input>
          <br />
          <h3>Password: </h3>
          <input className="logInPassword" onChange={this.input}></input>
          <br />
          <button className="logIn" onClick={this.logIn}>
            Log In
          </button>
        </div>
      </>
    );
  }
}

export default LogIn;
