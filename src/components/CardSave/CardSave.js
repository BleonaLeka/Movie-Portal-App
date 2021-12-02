import React, { Component } from 'react';
import './CardSave.css';

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
            <h2 className="card__title">{this.props.movieList.title ? this.props.movieList.title : this.props.movieList.name}</h2>
            <div className="card__extract" > {this.props.movieList.overview } </div>

            <div  className = 'btn delete'  onClick={() => this.props.deleteMovie()  }> Delete </div>

          </div>

        </div>
    );
  }
}

export default Card;