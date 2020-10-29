import React from 'react';
import './SortBar.css';

class SortBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: 0
    }

    this.sortResults = this.sortResults.bind(this);
    this.showButtons = this.showButtons.bind(this);
  }

  sortResults(e) {
    if (this.props.currentSort !== e.target.id) {
      this.props.sortResults(e.target.id);
    }
  }

  showButtons(){

    if(this.state.showButtons === 1)
    this.setState({showButtons: 0})

    if(this.state.showButtons === 0)
    this.setState({showButtons: 1})
      
  }

  render() {
    return (
      <div className="sortBarContainer">
        <div className="sortBarTitle sortSection" onClick={this.showButtons}>Sort By:</div>

          <div
            className="sortByName sortButton sortSection"
            id="name"
            onClick={this.sortResults}
            style={
              this.props.currentSort === 'name'
                ? { backgroundColor: '#FF5B3B', opacity: this.state.showButtons }
                : {opacity: this.state.showButtons}
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
                ? { backgroundColor: '#FF5B3B', opacity: this.state.showButtons}
                : {opacity: this.state.showButtons}
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
                ? { backgroundColor: '#FF5B3B', opacity: this.state.showButtons }
                : {opacity: this.state.showButtons}
            }
          >
            Release
          </div>
    </div>
    );
  }
}

export default SortBar;
