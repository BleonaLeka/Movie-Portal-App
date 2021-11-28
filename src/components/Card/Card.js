import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  // constructor(props){
  // super(props);
  // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <div className="card-container">

          <div className="card card-item">
            <h2 className="card__title">{this.props.movieList.title}</h2>
            <div className="card__extract" > {this.props.movieList.description } </div>
          </div>

        </div>
    );
  }
}

export default Card;