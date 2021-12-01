import { Component } from "react";
import './ProfileComponent.css';
import CardSave from '../CardSave/CardSave';
import Helper from "../../Helper";

class ProfileComponent extends  Component {

    constructor(props) {
        super(props);
        // console.log("--: ", JSON.parse(this.props.location.data));
        // var latelyIncomingData = JSON.parse(this.props.location.data);
        // var data = [];
        
        // // if(localStorage.getItem('data').hasOwnProperty){
        // //     console.log("--;aa "  );
        // //     localStorage.removeItem('data');
        // // }
        // localStorage.myMap = localStorage.getItem('data');
        // let map = new Map(JSON.parse(localStorage.myMap));
        // console.log("map: ", map);
        // localStorage.setItem('data',JSON.parse(this.props.location.data));
        // console.log("---:localStorage: ", JSON.parse(JSON.stringify(localStorage.getItem('data'))));
        this.state = {
            
            // Object to store data taken from fetch request.
            favoriteList: Helper.getMovieObject(),
            watchLaterList: [],
           
        }
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
          <h1>We have found some results for you</h1>
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
                This is profle page

                {Helper.getMovieObject().length > 0 ? this.renderData()  : null}

            </div>
        )
    }
}

export default ProfileComponent;