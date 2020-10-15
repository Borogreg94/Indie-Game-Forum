import React from 'react';
import './SortBar.css';

class SortBar extends React.Component {
  constructor(props) {
    super(props);

    this.sortResults = this.sortResults.bind(this);
  }

  sortResults(e) {
    if (this.props.currentSort !== e.target.id) {
      this.props.sortResults(e.target.id);
    }
  }

  render() {
    return (
      <div className="sortBarContainer">
        <div className="sortBarTitle sortSection">Sort By:</div>

        <div
          className="sortByName sortButton sortSection"
          id="name"
          onClick={this.sortResults}
          style={
            this.props.currentSort === 'name'
              ? { backgroundColor: '#FF5B3B' }
              : {}
          }
        >
          Name
        </div>

        <div
          className="sortByRating sortButton sortSection"
          id="rating"
          onClick={this.sortResults}
          style={
            this.props.currentSort === 'rating'
              ? { backgroundColor: '#FF5B3B' }
              : {}
          }
        >
          Top Rated
        </div>

        <div
          className="sortByRelease sortButton sortSection"
          id="release"
          onClick={this.sortResults}
          style={
            this.props.currentSort === 'release'
              ? { backgroundColor: '#FF5B3B' }
              : {}
          }
        >
          Release
        </div>
      </div>
    );
  }
}

export default SortBar;
