import React from 'react';
import './App.css';
import Animate from './Animate.js';

import Header from './Header.js';
import SearchResults from './SearchResults.js';
import SignUp from './SignUp.js';
import LogIn from './LogIn.js';
import GameOverlay from './GameOverlay.js';
import Favs from './Favs.js';
import backEndUrl from './backEndUrl.js'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test_user',

      searchResults: [],
      currentSort: '',

      signUpOpen: false,
      logInOpen: false,
      searchResultsOpen: true,
      favsOpen: false,
      gameOverlay: { open: false, gameId: null },

      signUpMessage: '',
      logInMessage: '',
    };

    this.openSignUp = this.openSignUp.bind(this);
    this.closeSignUpWindow = this.closeSignUpWindow.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.openLogIn = this.openLogIn.bind(this);
    this.closeLogInWindow = this.closeLogInWindow.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.openGameOverlay = this.openGameOverlay.bind(this);
    this.closeGameOverlay = this.closeGameOverlay.bind(this);
    this.openFavs = this.openFavs.bind(this);
    this.closeFavs = this.closeFavs.bind(this);
    this.search = this.search.bind(this);
    this.sortResults = this.sortResults.bind(this);
  }

  async componentDidMount() {
    
    try {
      const response = await fetch(`${backEndUrl}/getTopRatedGames`);
      if (response.ok) {
        const jsonResponse = await response.json();
        this.setState({ searchResults: jsonResponse, });
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async search(e) {
    if (e.key === 'Enter') {
      const input = e.target.value;
      try {
        const response = await fetch(`${backEndUrl}/search/${input}`);
        if (response.ok) {
          const jsonResponse = await response.json();
          this.setState({
            searchResults: jsonResponse,
            currentSort: '',
          });
        } else {
          throw new Error('didnt get response from server');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  sortResults(method) {
    let newArr, indexOfFirstNum, result;

    console.log('sort results: ', this.state.searchResults)

    switch (method) {
      case 'release':
        newArr = this.state.searchResults.sort((a, b) => {
          return ('' + a.releaseDate).localeCompare('' + b.releaseDate);
        });

        console.log('newArr: ', newArr);

        newArr.reverse();

        console.log('newArr (post reverse): ', newArr);

        indexOfFirstNum = newArr.findIndex((game) => {
          return typeof game.releaseDate === 'number';
        });

        result = newArr.splice(0, indexOfFirstNum);

        console.log('result : ', result);

        result.forEach((cur) => {
          newArr.push(cur);
        });

        console.log('newArr (at end): ', newArr);

        break;

      case 'rating':
        newArr = this.state.searchResults.sort((a, b) => {
          return ('' + a.rating).localeCompare('' + b.rating);
        });

        newArr.reverse();

        indexOfFirstNum = newArr.findIndex((game) => {
          return typeof game.rating === 'number';
        });

        result = newArr.splice(0, indexOfFirstNum);

        result.forEach((cur) => {
          newArr.push(cur);
        });
        break;

      case 'name':
        newArr = this.state.searchResults.sort((a, b) => {
          return ('' + a.name).localeCompare('' + b.name);
        });

        break;

      default:
        break;
    }

    this.setState({
      searchResults: newArr,
      currentSort: method,
    });
  }

  openSignUp() {
    this.setState({ signUpOpen: true });
  }

  closeSignUpWindow() {
    this.setState({ signUpOpen: false, signUpMessage: '' });
  }

  openLogIn() {
    this.setState({ logInOpen: true });
  }

  closeLogInWindow() {
    this.setState({ logInOpen: false, logInMessage: '', });
  }

  openGameOverlay(id) {
    this.setState({ gameOverlay: { open: true, gameId: id } });

    if (this.state.searchResultsOpen) {
      Animate.closeSearchResults();
      setTimeout(() => {
        this.setState({ searchResultsOpen: false });
      }, 500);
    }
  }

  closeGameOverlay() {
    this.setState({ searchResultsOpen: true });

    Animate.openSearchResults();
    Animate.closeGameOverlay();
    setTimeout(() => {
      this.setState({ gameOverlay: { open: false } });
    }, 500);
  }

  openFavs() {
    this.setState({ favsOpen: true });

    if (this.state.gameOverlay.open) {
      Animate.closeGameOverlay();
      setTimeout(() => {
        this.setState({ gameOverlay: { open: false } });
      }, 500);
    }

    if (this.state.searchResultsOpen) {
      Animate.closeSearchResults();
      setTimeout(() => {
        this.setState({ searchResultsOpen: false });
      }, 500);
    }
  }

  closeFavs() {
    this.setState({ searchResultsOpen: true });

    Animate.closeFavs();
    setTimeout(() => {
      this.setState({ favsOpen: false });
    }, 500);
  }

  async createAccount(username, password) {
    try {
      const response = await fetch(`${backEndUrl}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          this.setState({
            username: jsonResponse.username,

            signUpOpen: false,
          });
        } else {
          this.setState({ signUpMessage: 'Username Already Taken' });
        }
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logIn(username, password) {
    try {
      const response = await fetch(`${backEndUrl}/logIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        if (jsonResponse) {
          this.setState({
            username: jsonResponse.username,
            logInOpen: false,
          });
        } else {
          this.setState({ logInMessage: 'Incorrect Username or Password' });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  logOut() {
    if (this.state.gameOverlay.open) {
      Animate.closeGameOverlay();
    }

    if (this.state.favsOpen) {
      Animate.closeFavs();
    }

    if (this.state.favsOpen || this.state.gameOverlay.open) {
      setTimeout(() => {
        this.setState({
          username: null,

          searchResults: [],
          currentSort: '',

          signUpOpen: false,
          logInOpen: false,
          searchResultsOpen: true,
          favsOpen: false,
          gameOverlay: { open: false, gameId: null },
        });
      }, 500);
    } else {
      this.setState({
        username: null,

        searchResults: [],
        currentSort: '',

        signUpOpen: false,
        logInOpen: false,
        searchResultsOpen: true,
        favsOpen: false,
        gameOverlay: { open: false, gameId: null },
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="appBackground"></div>
        <Header
          openSignUp={this.openSignUp}
          openLogIn={this.openLogIn}
          username={this.state.username}
          logOut={this.logOut}
          openFavs={this.openFavs}
          closeFavs={this.closeFavs}
          favsOpen={this.state.favsOpen}
        />

        {this.state.signUpOpen ? (
          <SignUp
            closeSignUpWindow={this.closeSignUpWindow}
            createAccount={this.createAccount}
            signUpMessage={this.state.signUpMessage}
          />
        ) : null}

        {this.state.logInOpen ? (
          <LogIn closeLogInWindow={this.closeLogInWindow} logIn={this.logIn} logInMessage={this.state.logInMessage} />
        ) : null}

        {this.state.gameOverlay.open ? (
          <GameOverlay
            gameOverlay={this.state.gameOverlay}
            closeGameOverlay={this.closeGameOverlay}
            username={this.state.username}
          />
        ) : null}

        {this.state.searchResultsOpen ? (
          <SearchResults
            username={this.state.username}
            sortResults={this.sortResults}
            openGameOverlay={this.openGameOverlay}
            search={this.search}
            searchResults={this.state.searchResults}
            currentSort={this.state.currentSort}
          />
        ) : null}

        {this.state.favsOpen ? (
          <Favs
            username={this.state.username}
            openGameOverlay={this.openGameOverlay}
          />
        ) : null}
        <div className="searchResultsFiller"></div>
      </div>
    );
  }
}

export default App;
