import React from 'react';
import './SearchResults.css';
import GameCard from './GameCard.js';
import SortBar from './SortBar.js';
import Animate from './Animate.js';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Animate.openSearchResults();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchResults !== this.props.searchResults) {
      Animate.fadeInResultingGames();
    }
  }

  render() {
    return (
      <div className="searchResults">
        <SortBar
          sortResults={this.props.sortResults}
          currentSort={this.props.currentSort}
        />
        <div id="searchText">Search</div>
        <input
          type="text"
          id="searchInput"
          onKeyDown={this.props.search}
          size="20"
        ></input>

        {this.props.searchResults.length > 0 ? 
          <div className="resultingGames">
            {this.props.searchResults.map((card, index) => {
              return (
                <GameCard
                  username={this.props.username}
                  search={true}
                  key={index}
                  id={card.id}
                  name={card.name}
                  releaseDate={card.releaseDate}
                  gameSite={card.gameSite}
                  cover={card.cover}
                  summary={card.summary}
                  openGameOverlay={this.props.openGameOverlay}
                />
              );
            })}
          </div>
        :
            <div className='noResults'>
              No Results
            </div>
        }
        
      </div>
    );
  }
}

export default SearchResults;
