import { Component } from "react";
import './ProfileComponent.css';
import CardSave from '../CardSave/CardSave';
import Helper from "../../Helper";
import { Redirect } from "react-router-dom";
import { Link, Route, Switch } from 'react-router-dom';

class ProfileComponent extends  Component {

    constructor(props) {
        super(props);

        this.state = {
            
            // Object to store data taken from fetch request.
            favoriteList: Helper.getMovieObject(),
            watchLaterList: [],
           
        }
    }

    componentDidMount(){
      /*
       todo
      */
    }

    deleteFromFavoriteList(item){
      // Check if movie is set to list 
      if(Helper.getMovieObject().includes(item)){
        console.log(`'${item.title}' movie is deleted`);
        Helper.removeMovieObject(item);
        this.setState({
          favoriteList: Helper.getMovieObject()
        })
  
      } 
      
    }
    //other way to render some data
  renderData() {
    if (Helper.getMovieObject().length > 0) {
      return (
        <div className="searchlist-container">
          <div className="cards">
            {Helper.getMovieObject().map(((item) => (
              <CardSave
                key={item.id}
                movieList={item}
                deleteMovie = { () => this.deleteFromFavoriteList(item)}
                ref={this.child}
              ></CardSave>
            )))           
             }
          </div>
        </div>
      )
    }

  }

    render(){
        return(
            <div className="container">
                This is Favorite List

                {Helper.getMovieObject().length > 0 ? this.renderData()  : null}

            </div>
        )
    }
}

export default ProfileComponent;