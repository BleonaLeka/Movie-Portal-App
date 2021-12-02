import { Component } from "react";
import './WatchLaterComponent.css';
import CardSave from '../CardSave/CardSave';
import Helper from "../../Helper";

class WatchLaterComponent extends  Component {

    constructor(props) {
        super(props);
        
        this.state = {
            
            // Object to store data taken from fetch request.
            watchLaterList: Helper.getWatchLaterMovieObject(),
           
        }
    }


    deleteFromWatchLaterList(item){
      // Check if movie is set to list 
      if(Helper.getWatchLaterMovieObject().includes(item)){
        console.log(`'${item.title}' movie is deleted`);
        Helper.removeWatchLaterMovieObject(item);
        this.setState({
          favoriteList: Helper.getMovieObject()
        })
  
      } 
      
    }
    //other way to render some data
  renderData() {
    if (Helper.getWatchLaterMovieObject().length > 0) {
      return (
        <div className="searchlist-container">
          <h1>We have found some results for you</h1>
          <div className="cards">
            {Helper.getWatchLaterMovieObject().map(((item) => (
              <CardSave
                key={item.id}
                movieList={item}
                deleteMovie = { () => this.deleteFromWatchLaterList(item)}
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

              This is Watch Later List
                {Helper.getWatchLaterMovieObject().length > 0 ? this.renderData()  : null}

            </div>
        )
    }
}

export default WatchLaterComponent;