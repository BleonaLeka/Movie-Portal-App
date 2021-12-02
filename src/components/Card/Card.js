import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  constructor(props){

  super(props);
  this.count =  0;

    this.state = {
      userList: [],
      isFavouriteClicked: false,
      isWatchLaterClicked: false
    };
  }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  changeSaveButtonToDisable = (item) => {
    this.setState({
      isFavouriteClicked: true
    })

  }

  changeSaveWatchLaterToDisable(item) {
    this.setState({
      isWatchLaterClicked: true
    })
  }
  render() {
    return (
      <div className="card-container">

          <div className="card card-item">
            <h2 className="card__title">{this.props.movieList.title ? this.props.movieList.title : this.props.movieList.name}</h2>
            <div className="card__extract" > {this.props.movieList.overview } </div>
            <a href="https://www.youtube.com/watch?v=6ZfuNTqbHE8"  target="_blank">Link</a>
            <div  className={this.state.isFavouriteClicked ? 'btn save' : 'btn save' } onClick={() => this.props.saveMovie()  }>Save </div>
            <div  className={this.state.isWatchLaterClicked ? 'btn watch-later' : 'btn watch-later' } onClick={this.props.watchLaterMovie  }>Watch Later</div>

          </div>

        </div>
    );
  }
}

export default Card;