import React from 'react';
import './GameOverlay.css';

import Animate from './Animate.js';
import GameCard from './GameCard.js';
import backEndUrl from './backEndUrl.js'

class GameOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.commentText = React.createRef();

    this.state = {
      overlayCard: {},
      comments: [],
    };

    this.getComments = this.getComments.bind(this);
    this.renderComments = this.renderComments.bind(this);
    this.closeGameOverlay = this.closeGameOverlay.bind(this);
    this.newCommentText = this.newCommentText.bind(this);
    this.sendNewComment = this.sendNewComment.bind(this);
  }

  async getCard(id) {
    try {
      const response = await fetch(`${backEndUrl}/getCard/${id}`);
      if (response.ok) {
        const jsonResponse = await response.json();

        this.setState({ overlayCard: jsonResponse });
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getComments(id) {
    try {
      const response = await fetch(`${backEndUrl}/getComments/${id}`);
      if (response.ok) {
        const jsonResponse = await response.json();

        this.setState({ comments: jsonResponse });
      } else {
        throw new Error('didnt get response from server');
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getCard(this.props.gameOverlay.gameId);
    this.getComments(this.props.gameOverlay.gameId);

    Animate.openGameOverlay();
  }

  componentDidUpdate(prevProps){
    if(this.props.username !== prevProps.username){
      this.commentText.current.value = ''
    }
  }

  renderComments() {
    const commentList = this.state.comments.map((comment, index) => {
      return (
        <div className="commentBox" index={index}>
          <div className="commentBoxUsername">{comment.username}</div>
          <div className="commentBoxTime">{comment.time}</div>
          <div className="commentBoxText">{comment.text}</div>
        </div>
      );
    });
    return commentList;
  }

  closeGameOverlay() {
    this.props.closeGameOverlay();
  }

  newCommentText(e) {
    this.setState({ newCommentText: e.target.value });
  }

  async sendNewComment() {
    const date1 = Date.now();
    const date2 = new Date(date1);
    const timeString = date2.toLocaleString();

    if (this.props.username && this.commentText.current.value !== '') {
      try {
        const response = await fetch(`${backEndUrl}/addComment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gameId: this.props.gameOverlay.gameId,
            username: this.props.username,
            comment: this.commentText.current.value,
            time: timeString,
          }),
        });
        if (response.ok) {
          const jsonResponse = await response.json();

          this.setState({ comments: jsonResponse });
          this.commentText.current.value = '';
        } else {
          throw new Error('didnt get response from server');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.commentText.current.value = "Please Log In or Create an Account to leave a Comment";
    }
  }

  render() {
    if (!this.props.gameOverlay.open) return null;
    return (
      <>
        <div className="gameOverlayBackground">
          <div className="gameAndCommentsContainer">
            <div className="gameCardOverlay">
              <div
                className="closeOverlayButton"
                onClick={this.closeGameOverlay}
              >
                Close Overlay
              </div>
              <GameCard
                fromOverlay={true}
                closeGameOverlay={this.closeGameOverlay}
                username={this.props.username}
                id={this.props.gameOverlay.gameId}
                name={this.state.overlayCard.name}
                releaseDate={this.state.overlayCard.releaseDate}
                gameSite={this.state.overlayCard.gameSite}
                cover={this.state.overlayCard.cover}
                summary={this.state.overlayCard.summary}
              />
              <div className="addNewCommentContainer">
                <textarea
                  ref={this.commentText}
                  className="addNewCommentInput"
                  placeholder="Add a New Comment"
                  onChange={this.newCommentText}
                ></textarea>
                <button
                  className="addNewCommentSubmit"
                  onClick={this.sendNewComment}
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="commentsList">{this.renderComments()}</div>
          </div>
        </div>
      </>
    );
  }
}

export default GameOverlay;
