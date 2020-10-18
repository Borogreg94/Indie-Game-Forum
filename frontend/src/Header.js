import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.open_close_Favs = this.open_close_Favs.bind(this);
  }

  open_close_Favs() {
    if (this.props.favsOpen) {
      this.props.closeFavs();
    } else {
      this.props.openFavs();
    }
  }

  render() {
    if (this.props.username) {
      return (
        <header className="App-header">
          <h1>Indie Game Forum</h1>

          <div className="usernameDisplay">
            Logged in as:{' '}
            <p style={{ color: '#f7c171' }}>{this.props.username}</p>
          </div>
          <div className="logOutButton" onClick={this.props.logOut}>
            Log Out
          </div>
          <div className="seeFavsButton" onClick={this.open_close_Favs}>
            <div>{this.props.favsOpen ? 'Close Favs' : 'Open Favs'}</div>
          </div>
        </header>
      );
    } else {
      return (
        <header className="App-header">
          <h1>Indie Game Forum</h1>

          <div className="signUpButton" onClick={this.props.openSignUp}>
            Create Account
          </div>
          <div className="signInButton" onClick={this.props.openLogIn}>
          Log In
          </div>
        </header>
      );
    }
  }
}

export default Header;
