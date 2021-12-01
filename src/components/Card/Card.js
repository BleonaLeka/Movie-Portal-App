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

    console.log("---: ", this.state.isFavouriteClicked);
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
            <h2 className="card__title">{this.props.movieList.title}</h2>
            <div className="card__extract" > {this.props.movieList.overview } </div>

            <div className="card__extract" > {this.props.movieList.overview } </div>

            <div  className={this.state.isFavouriteClicked ? 'disable' : 'btn save' } onClick={() => this.props.saveMovie()  }>Save </div>
            <div  className={this.state.isWatchLaterClicked ? 'disable' : 'btn watch-later' } onClick={this.props.watchLaterMovie  }>Watch Later</div>

          </div>

        </div>
    );
  }
}

export default Card;