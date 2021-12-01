import { Component } from "react";
import './ProfileComponent.css';
import Card from '../Card/Card';

class ProfileComponent extends  Component {

    constructor(props) {
        super(props);
        console.log("--: ", this.props.location.data);

        if(localStorage.getItem('data')){
            console.log("--;aa ", localStorage.getItem('data').length);
        }
        localStorage.setItem('data',this.props.location.data);
        this.state = {
            
            // Object to store data taken from fetch request.
            favoriteList: this.props.location.data,
            watchLaterList: [],
           
        }
    }

    //other way to render some data
  renderData() {
    if (this.state.favoriteList.length > 0) {
      return (
        <div className="searchlist-container">
          <h1>We have found some results for you</h1>
          <div className="cards">
            {this.state.favoriteList.map(((item) => (
              <Card
                key={item.id}
                movieList={item}
                saveMovie = { () => this.saveToFavoriteList(item)}
                watchLaterMovie = { () => this.saveToWatchLaterList(item)}
                ref={this.child}
              ></Card>
            )))}
          </div>
        </div>
      )
    }

  }

    render(){
        return(
            <div className="container">
                This is profle page

                {this.renderData()}

            </div>
        )
    }
}

export default ProfileComponent;