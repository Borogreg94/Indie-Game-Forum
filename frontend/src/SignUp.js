import React from 'react';
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };

    this.closeWindow = this.closeWindow.bind(this);
    this.input = this.input.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  closeWindow() {
    this.props.closeSignUpWindow();
  }

  input(e) {
    if (e.target.className === 'signUpUsername') {
      this.setState({ username: e.target.value });
    } else if (e.target.className === 'signUpPassword') {
      this.setState({ password: e.target.value });
    }
  }

  createAccount() {
    this.props.createAccount(this.state.username, this.state.password);
  }

  render() {
    return (
      <>
        <div className="signUpBackground"></div>
        <div className="signUpWindow">
          <button className="closeSignUpWindow" onClick={this.closeWindow}>
            X
          </button>
          <h2>Create an Account</h2>
          <h3>Username: </h3>
          <input className="signUpUsername" onChange={this.input}></input>
          <br />
          <h3>Password: </h3>
          <input className="signUpPassword" onChange={this.input}></input>
          <br />
          <button className="createAccount" onClick={this.createAccount}>
            Create Account
          </button>
        </div>
      </>
    );
  }
}

export default SignUp;
