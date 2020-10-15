import React from 'react';
import './GameCard.css';
import commentIcon from './icons/comment.svg';
import starIconEmpty from './icons/emptyStar.svg';
import starIconFull from './icons/filledStar.svg';
import heartIconEmpty from './icons/heartEmpty.svg';
import heartIconFull from './icons/heartFull.svg';

const angryBirds = {
  id: 60226,
  age_ratings: [15305],
  category: 0,
  collection: 377,
  cover: 39903,
  created_at: 1504828800,
  external_games: [111376, 1902924],
  first_release_date: 1433980800,
  genres: [9],
  involved_companies: [58772, 58773],
  keywords: [
    1228,
    1682,
    2679,
    2875,
    4134,
    4247,
    4460,
    4467,
    4552,
    4721,
    4722,
    5272,
    5756,
    8297,
  ],
  multiplayer_modes: [7630],
  name: 'Angry Birds Fight!',
  platforms: [34],
  popularity: 2.114465513561907,
  release_dates: [120639],
  screenshots: [138069, 138070, 138071, 138072],
  similar_games: [
    10603,
    20329,
    25222,
    26223,
    54678,
    55173,
    55190,
    56033,
    60044,
  ],
  slug: 'angry-birds-fight',
  summary:
    'Angry Birds Fight! is a match puzzle game spin-off in the Angry Birds series. It debuted in January 2015 in Thailand and continued westward for further releases throughout 2015.',
  tags: [
    268435465,
    536872140,
    536872594,
    536873591,
    536873787,
    536875046,
    536875159,
    536875372,
    536875379,
    536875464,
    536875633,
    536875634,
    536876184,
    536876668,
    536879209,
  ],
  updated_at: 1598400000,
  url: 'https://www.igdb.com/games/angry-birds-fight',
  videos: [17025],
  websites: [117505],
  checksum: '57c40fb3-948e-1939-19f6-4ef82ab57f3c',
};

const zelda = {
  id: 1029,
  age_ratings: [3894, 8691],
  alternative_names: [
    6662,
    30747,
    30748,
    30749,
    39120,
    39121,
    39122,
    39123,
    39124,
    39125,
    39126,
    39127,
    39130,
    39131,
    39132,
    39133,
    39134,
    39135,
  ],
  bundles: [45139],
  category: 0,
  collection: 106,
  cover: 76691,
  created_at: 1326240000,
  expansions: [132646],
  external_games: [28435, 145554, 221018, 222048, 245153, 1934582],
  first_release_date: 911606400,
  franchises: [596],
  game_engines: [1051],
  game_modes: [1],
  genres: [8, 9, 12, 31],
  hypes: 2,
  involved_companies: [23213, 23214],
  keywords: [
    121,
    132,
    137,
    170,
    227,
    274,
    296,
    332,
    452,
    472,
    558,
    592,
    594,
    623,
    701,
    770,
    823,
    826,
    846,
    872,
    939,
    960,
    1033,
    1098,
    1102,
    1181,
    1193,
    1289,
    1317,
    1320,
    1379,
    1381,
    1459,
    1513,
    1778,
    1935,
    2071,
    2112,
    2199,
    2324,
    2414,
    2438,
    2452,
    2472,
    2762,
    3182,
    3313,
    3433,
    3486,
    3833,
    3919,
    4031,
    4138,
    4140,
    4144,
    4161,
    4169,
    4183,
    4187,
    4213,
    4285,
    4317,
    4320,
    4321,
    4350,
    4359,
    4364,
    4389,
    4392,
    4393,
    4396,
    4410,
    4418,
    4421,
    4425,
    4428,
    4463,
    4476,
    4477,
    4484,
    4525,
    4548,
    4550,
    4552,
    4579,
    4582,
    4587,
    4611,
    4622,
    4625,
    4629,
    4694,
    4711,
    4725,
    4727,
    4755,
    4760,
    4763,
    4769,
    4781,
    190,
  ],
  name: 'The Legend of Zelda: Ocarina of Time',
  platforms: [4, 5, 21, 41, 47],
  player_perspectives: [2],
  popularity: 20.61459303868956,
  pulse_count: 34,
  rating: 92.3494247816231,
  rating_count: 1132,
  release_dates: [2513, 2514, 2515, 144249, 144250, 144251, 144252, 144253],
  screenshots: [18046, 24104, 24105, 24106, 24107],
  similar_games: [121, 1026, 1032, 1035, 1036, 1037, 1041, 2909, 7346],
  slug: 'the-legend-of-zelda-ocarina-of-time',
  standalone_expansions: [45142],
  summary:
    "The Legend of Zelda: Ocarina of Time reveals the genesis of the fantasy land of Hyrule, the origin of the Triforce, and the tale of the first exploits of Princess Zelda and the heroic adventurer Link. Vibrant, real-time 3-D graphics transport you into the fantasy world of Hyrule. Your quest takes you through dense forests and across wind-whipped deserts. Swim raging rivers, climb treacherous mountains, dash on horseback across rolling hills, and delve into dungeons full of creatures that fight to the finish to put an end to your adventures. With immersive graphics, a sweeping story line, swashbuckling adventure, mind-bending puzzles, and a touch of humor, The Legend of Zelda: Ocarina of Time is one of Nintendo's most epic challenges ever.",
  tags: [
    1,
    17,
    33,
    268435464,
    268435465,
    268435468,
    268435487,
    536871033,
    536871044,
    536871049,
    536871082,
    536871139,
    536871186,
    536871208,
    536871244,
    536871364,
    536871384,
    536871470,
    536871504,
    536871506,
    536871535,
    536871613,
    536871682,
    536871735,
    536871738,
    536871758,
    536871784,
    536871851,
    536871872,
    536871945,
    536872010,
    536872014,
    536872093,
    536872105,
    536872201,
    536872229,
    536872232,
    536872291,
    536872293,
    536872371,
    536872425,
    536872690,
    536872847,
    536872983,
    536873024,
    536873111,
    536873236,
    536873326,
    536873350,
    536873364,
    536873384,
    536873674,
    536874094,
    536874225,
    536874345,
    536874398,
    536874745,
    536874831,
    536874943,
    536875050,
    536875052,
    536875056,
    536875073,
    536875081,
    536875095,
    536875099,
    536875125,
    536875197,
    536875229,
    536875232,
    536875233,
    536875262,
    536875271,
    536875276,
    536875301,
    536875304,
    536875305,
    536875308,
    536875322,
    536875330,
    536875333,
    536875337,
    536875340,
    536875375,
    536875388,
    536875389,
    536875396,
    536875437,
    536875460,
    536875462,
    536875464,
    536875491,
    536875494,
    536875499,
    536875523,
    536875534,
    536875537,
    536875541,
    536875606,
    536875623,
    197,
  ],
  themes: [1, 17, 33],
  time_to_beat: 1029,
  total_rating: 92.3494247816231,
  total_rating_count: 1132,
  updated_at: 1599609600,
  url: 'https://www.igdb.com/games/the-legend-of-zelda-ocarina-of-time',
  videos: [8797],
  websites: [7472, 7473],
  checksum: 'c0f689b8-ce22-860b-1a91-d51cb019485d',
};

class GameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starFill: 0,
      heartFill: false,
      personalRating: null,
      ratingTitle: 'Rate',

      averageRating: '--',
    };

    this.commentButton = this.commentButton.bind(this);
    this.createRatingIcons = this.createRatingIcons.bind(this);
    this.starHover = this.starHover.bind(this);
    this.sendStarRating = this.sendStarRating.bind(this);
    this.starDefault = this.starDefault.bind(this);
    this.add_remove_fav = this.add_remove_fav.bind(this);
    // this.receiveRating = this.receiveRating.bind(this);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      try {
        const response = await fetch(
          `//localhost:8000/getPersonalRating/${this.props.username}/${this.props.id}`
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
          `//localhost:8000/getCardFav/${this.props.username}/${this.props.id}`
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
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(
        `//localhost:8000/getPersonalRating/${this.props.username}/${this.props.id}`
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
        `//localhost:8000/getCardFav/${this.props.username}/${this.props.id}`
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
        `//localhost:8000/getAverageRating/${this.props.id}`
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
      return dateWithTime.substring(0, 10);
    } else {
      return 'N/A';
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
    }
  }

  starDefault() {
    const starDefault = this.state.personalRating;
    this.setState({ starFill: starDefault });
  }

  async sendStarRating(e) {
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
    }

    try {
      const response = await fetch(`//localhost:8000/addRating`, {
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
  }

  createRatingIcons() {
    return (
      <>
        <img
          className="starIcon"
          id="star1"
          src={this.state.starFill >= 0 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
        />
        <img
          className="starIcon"
          id="star2"
          src={this.state.starFill > 1 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
        />
        <img
          className="starIcon"
          id="star3"
          src={this.state.starFill > 2 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
        />
        <img
          className="starIcon"
          id="star4"
          src={this.state.starFill > 3 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
        />
        <img
          className="starIcon"
          id="star5"
          src={this.state.starFill > 4 ? starIconFull : starIconEmpty}
          onMouseEnter={this.starHover}
          onClick={this.sendStarRating}
        />
      </>
    );
  }

  async add_remove_fav() {
    try {
      const response = await fetch(`//localhost:8000/add_remove_fav`, {
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
  }

  render() {
    return (
      <div className="gameCard">
        <div className="gameName">{this.props.name}</div>
        <div className="gameRatings">
          <p>Average Rating: </p>
          <p>{this.state.averageRating}</p>
        </div>
        <div className="gameReleaseDate">
          <p>Release Date: </p>
          <p>{this.unixConverter(this.props.releaseDate)}</p>
        </div>
        <div className="gamePlatforms">
          <p>Website: </p>
          <p>{this.props.gameSite}</p>
        </div>
        <div className="gameCover">
          <img src={this.props.cover} />
        </div>
        <div className="gameSummary">
          <p>{this.summaryFormatter(this.props.summary)}</p>
        </div>

        <div className="commentButton" onClick={this.commentButton}>
          Comment
          <br />
          <img className="commentIcon" src={commentIcon}></img>
        </div>
        <div className="rateButton" onMouseLeave={this.starDefault}>
          {this.state.ratingTitle}
          <br />
          {this.createRatingIcons()}
        </div>
        <div className="saveToFavButton" onClick={this.add_remove_fav}>
          Save to Fav
          <br />
          <img
            className="favIcon"
            src={this.state.heartFill ? heartIconFull : heartIconEmpty}
          />
        </div>
      </div>
    );
  }
}

export default GameCard;
