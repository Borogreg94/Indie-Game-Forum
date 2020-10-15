import React from 'react';
import './Favs.css';
import Animate from './Animate.js';

class Favs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favList: [],
    };

    this.gameOverlayAppear = this.gameOverlayAppear.bind(this);
  }

  async componentDidMount() {
    Animate.openFavs();
    try {
      const response = await fetch(
        `//localhost:8000/getFavsList/${this.props.username}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          this.setState({
            favList: jsonResponse.favList,
          });
        }
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }

  gameOverlayAppear(e) {
    const gameId = Number(e.currentTarget.id);
    this.props.openGameOverlay(gameId);
  }

  render() {
    return (
      <div className="favsListBackground">
        <div className="favsList">
          {this.state.favList.map((game, index) => {
            return (
              <div
                className="favsCardContainer"
                id={game.id}
                onClick={this.gameOverlayAppear}
              >
                <div className="favsCardTitle">{game.name}</div>
                <div className="favsCardCover">
                  <img src={game.cover} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Favs;
