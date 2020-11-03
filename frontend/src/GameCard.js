import React from 'react';
import './GameCard.css';
import commentIcon from './icons/comment.svg';
import starIconEmpty from './icons/emptyStar.svg';
import starIconFull from './icons/filledStar.svg';
import heartIconEmpty from './icons/heartEmpty.svg';
import heartIconFull from './icons/heartFull.svg';
import backEndUrl from './backEndUrl.js'

class GameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starFill: 0,
      heartFill: false,
      personalRating: null,
      ratingTitle: 'Rate',

      averageRating: '--',

      loggedIn_1: true,
      loggedIn_2: true,
      loggedIn_3: true,
    };

    this.commentButton = this.commentButton.bind(this);
    this.createRatingIcons = this.createRatingIcons.bind(this);
    this.starHover = this.starHover.bind(this);
    this.sendStarRating = this.sendStarRating.bind(this);
    this.starDefault = this.starDefault.bind(this);
    this.add_remove_fav = this.add_remove_fav.bind(this);
    
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id || prevProps.username !== this.props.username) {
      try {
        const response = await fetch(
          `${backEndUrl}/getPersonalRating/${this.props.username}/${this.props.id}`
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse) {
            this.setState({
              personalRating: jsonResponse.personalRating,
              starFill: jsonResponse.personalRating,
              ratingTitle: jsonResponse.ratingTitle,
              
              loggedIn_2: true,
              loggedIn_3: true,
            });
          }
        } else {
          throw new Error('didnt get response from server');
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await fetch(
          `${backEndUrl}/getCardFav/${this.props.username}/${this.props.id}`
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse) {
            this.setState({
              heartFill: jsonResponse.heartFill,
            });
          }
        } else {
          throw new Error('didnt get response from server');
        }
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await fetch(
          `${backEndUrl}/getAverageRating/${this.props.id}`
        );
  
        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse.avg) {
            this.setState({ averageRating: jsonResponse.avg });
          }else{
            this.setState({ averageRating: '--' });
          }
        } else {
          throw new Error('didnt get response from server');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        `${backEndUrl}/getPersonalRating/${this.props.username}/${this.props.id}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          this.setState({
            personalRating: jsonResponse.personalRating,
            starFill: jsonResponse.personalRating,
            ratingTitle: jsonResponse.ratingTitle,
          });
        }
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${backEndUrl}/getCardFav/${this.props.username}/${this.props.id}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          this.setState({
            heartFill: jsonResponse.heartFill,
          });
        }
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        `${backEndUrl}/getAverageRating/${this.props.id}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.avg) {
          this.setState({ averageRating: jsonResponse.avg });
        }
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }

  unixConverter(stamp) {
    if (typeof stamp === 'number') {
      const milliseconds = stamp * 1000;
      const dateObject = new Date(milliseconds);
      const dateWithTime = dateObject.toLocaleString();

      const initialSubstring = dateWithTime.substring(0, 10);


      if(initialSubstring[8] === ','){
        return initialSubstring.substring(0, 8)
      }else if(initialSubstring[9] === ','){
        return initialSubstring.substring(0, 9)
      }
      else{
        return initialSubstring
      }

       
    } else {
      return '--';
    }
  }

  summaryFormatter(summary) {
    if (summary && summary.length >= 819) {
      let newSummary = summary.substring(0, 819);
      newSummary += '...';
      return newSummary;
    } else {
      return summary;
    }
  }

  commentButton() {
    if (this.props.fromOverlay) {
      this.props.closeGameOverlay();
    } else {
      this.props.openGameOverlay(this.props.id);
    }
  }

  starHover(e) {
    switch (e.target.id) {
      case 'star1':
        this.setState({ starFill: 1 });
        break;

      case 'star2':
        this.setState({ starFill: 2 });
        break;

      case 'star3':
        this.setState({ starFill: 3 });
        break;

      case 'star4':
        this.setState({ starFill: 4 });
        break;

      case 'star5':
        this.setState({ starFill: 5 });
        break;

      default:
        break;
    }
  }

  starDefault() {
    const starDefault = this.state.personalRating;
    this.setState({ starFill: starDefault });
  }

  async sendStarRating(e) {

    if(this.props.username){
    let ratingToSend;

    switch (e.target.id) {
      case 'star1':
        ratingToSend = 1;
        break;

      case 'star2':
        ratingToSend = 2;
        break;

      case 'star3':
        ratingToSend = 3;
        break;

      case 'star4':
        ratingToSend = 4;
        break;

      case 'star5':
        ratingToSend = 5;
        break;

      default:
        break;
    }

    try {
      const response = await fetch(`${backEndUrl}/addRating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.props.username,
          gameId: this.props.id,
          rating: ratingToSend,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse) {
          this.setState({
            personalRating: jsonResponse.personalRating,
            ratingTitle: 'Your Rating',
          });
        }
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }else{
    this.setState({loggedIn_2: false})
  }
  }

  createRatingIcons() {
    return (
      <>
        <img
          className="starIcon"
          id="star1"
          src={this.state.starFill > 0 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
          alt='star'
        />
        <img
          className="starIcon"
          id="star2"
          src={this.state.starFill > 1 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
          alt='star'
        />
        <img
          className="starIcon"
          id="star3"
          src={this.state.starFill > 2 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
          alt='star'
        />
        <img
          className="starIcon"
          id="star4"
          src={this.state.starFill > 3 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
          alt='star'
        />
        <img
          className="starIcon"
          id="star5"
          src={this.state.starFill > 4 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
          alt='star'
        />
      </>
    );
  }

  async add_remove_fav() {

    if(this.props.username){

      try {
        const response = await fetch(`${backEndUrl}/add_remove_fav`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.props.username,
            gameId: this.props.id,
          }),
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          if (jsonResponse) {
            this.setState({
              heartFill: jsonResponse.heartFill,
            });
          }
        } else {
          throw new Error('didnt get response from server');
        }
      } catch (error) {
        console.log(error);
      }

    }else{
      this.setState({loggedIn_3: false})
    }
  }

  createRating(avgRating){
    if(typeof avgRating === 'number'){
      const initialRating = Math.round(avgRating * 10) / 10
      return initialRating
    }else{
      return '--'
    }
  }

  render() {     
    return (
      <div className="gameCard">

        <div className="gameName">{this.props.name}</div>

        <div className="gameRatings">
          <p>Average Rating: </p>
          <p>{this.createRating(this.state.averageRating)}/5</p>
        </div>

        <div className="gameReleaseDate">
          <p>Release Date: </p>
          <p>{this.unixConverter(this.props.releaseDate)}</p>
        </div>

        <div className="gameWebsite">
          <div className='gameWebsiteContainer'>
            {this.props.gameSite ? <a href={this.props.gameSite} target="_blank" rel="noopener noreferrer">Visit Official Website</a> 
            : <div className='gameSiteNotAv'>Game Site Not Available</div>}
          </div>
        </div>

        <div className="gameCover">
          <img src={this.props.cover} alt='not available'/>
        </div>
        <div className="gameSummary">
          <p>{this.summaryFormatter(this.props.summary)}</p>
        </div>

        <div className="commentButton" onClick={this.commentButton}>
          Comment
          <br />
          <img className="commentIcon" src={commentIcon} alt='comment'/>
        </div>

        {this.state.loggedIn_2 ? 
        <div className="rateButton" onMouseLeave={this.starDefault}>
          {this.state.ratingTitle}
          <br />
          {this.createRatingIcons()}
        </div>
        : <div className="rateButton">Please Log In or Create an Account</div>}
        

        {this.state.loggedIn_3 ?  <div className="saveToFavButton" onClick={this.add_remove_fav}>
          Save to Fav
          <br />
          <img
            className="favIcon"
            src={this.state.heartFill ? heartIconFull : heartIconEmpty}
            alt='favIcon'
          />
        </div> 
        : <div className="saveToFavButton">Please Log In or Create an Account</div> }
        
      </div>
    );
  }
}

export default GameCard;
