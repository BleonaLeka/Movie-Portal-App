/*

  API_KEY is genereated from themoviedb. After signup with an account we get a token so we can use it as apikey 

*/




import React, { Component } from 'react';
import Card from '../../Card/Card';
import './SearchComponent.css';
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti"
import { Link, Route, Switch } from 'react-router-dom';
import ProfileComponent from '../../Profile/ProfileComponent';
import PopUp from "../../PopUp/PopUpComponent";

import MOVIES from '../../../test/movies';
import Helper from '../../../Helper';
import WatchLaterComponent from '../../WatchLater/WatchLaterComponent';
class SearchComponent extends Component {

  constructor(props) {
    super(props);
    // this is to reference child from this parent component
    this.child = React.createRef();

    this.state = {

      isResponsive: false,
      searchText: "",
      // Object to store data taken from fetch request.
      movieList: MOVIES.data,
      favoriteList: Helper.getMovieObject(),
      watchLaterList: Helper.getWatchLaterMovieObject(),
      displayPopUp: false,
      messageOnPopUp: '',
      MOVIEAPI: `https://api.themoviedb.org/3/movie/popular`,
      API_KEY: 'd2b226dfd108f4906912a1dca70487b8', /// API to call for loading most popular movies 
      SEARCHMOVIEAPI: `https://api.themoviedb.org/3/search/collection`,


    };

  }


  // This is called after every element is rendered 
  /*
    In this part we load our data from api
  */
  componentDidMount() {
    this.fetchMovies();
  }

  /**
   * In this method we fetch data from API. we get all data from the request and set it to our state element movieList;
   */
  fetchMovies = () => {
    fetch(`${this.state.MOVIEAPI}?api_key=${this.state.API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length != 0) {
          this.setState({ movieList: data.results });
        }
        else {
          // EX: If search is inappropriate, tell user to search sth meaningful
          alert("0 Results found! ")
        }
      })
      .catch((e) => {
        //Display error in console if catches error
        console.log(e);
      });
  }

/*
  When search and press enter we make our request to another api endpoint to get data from the string we entered on search field.
  Our parameters to api request is passed through queryString: EX (&query='stringfromsearchfield')
*/
  requestHandler(search) {
    const SEARCH_API = `${this.state.SEARCHMOVIEAPI}?api_key=${this.state.API_KEY}&language=en-US&page=1&query=${search}`;
    fetch(SEARCH_API)
      .then(response => response.json())
      .then(data => {
        if (data.results.length != 0)
          this.setState({ movieList: data.results });
        else {
          // EX: If search is inappropriate, tell user to search sth meaningful
          this.fetchMovies();
        }
      })
      .catch((e) => {
        //Display error in console if catches error
        console.log(e);
      });
  }

  // Everytime we write a character to the search form field this method get called and change our searchText
  handleSearchInputChange = (e) => {
    this.setState({ searchText: e.target.value })

  }

// Make call of search api and fetch data to movieList
  onSearch(e) {
    e.preventDefault();
    if (this.state.searchText) {
      this.requestHandler(this.state.searchText);
    } else
      // EX:  If search input is empty then make a api call to load all popular movies
      this.fetchMovies();

  }

  // toggle when close for popup 
  togglePop = () => {
    this.setState({
      displayPopUp: false
    });
  };

  // method to append movie to watch list 
  saveToFavoriteList(item) {
    this.child.current.changeSaveButtonToDisable();

    // Check if movie is set to list before
    if (Helper.getMovieObject().includes(item)) {
      console.log(`'${item.title}' movie is on your List`);
      this.setState({
        displayPopUp: true,
        messageOnPopUp: `'${item.title}' movie is on your favorite List`
      })
    } else {
      console.log("Movie to save: ", item);
      Helper.appendMovieObject(item);
      this.setState({
        favoriteList: Helper.getMovieObject()
      })
    }

  }

  saveToWatchLaterList(item) {
    this.child.current.changeSaveWatchLaterToDisable();

    // Check if movie is set to list 
    if (this.state.watchLaterList.includes(item)) {
      console.log(`'${item.title}' movie is on your List`);
      this.setState({
        displayPopUp: true,
        messageOnPopUp: `'${item.title}' movie is on your watch Later List`
      })

    } else {
      console.log("Movie to watch later: ", item);
      Helper.appendWatchLaterObject(item);
      this.setState({
        watchLaterList: Helper.getWatchLaterMovieObject()
      })
    }

  }

  //Open nav menu
  openNavMenu(){
    this.setState({
      isResponsive: !this.state.isResponsive
    })
  }
  //other way to render some data 
  /*
    Everytime the length of the list is not 0 we return all cards with their properties
  */
  renderData() {
    if (this.state.movieList.length > 0) {
      return (
          <div className="cards">
            {/* iterate through list of movies using map, its the same as for loop */}
            {this.state.movieList.map(((item) => (
              <Card
                key={item.id}
                movieList={item}
                saveMovie={() => this.saveToFavoriteList(item)} // the way we call parent methods from its child compoment
                watchLaterMovie={() => this.saveToWatchLaterList(item)}
                ref={this.child}
              ></Card>
            )))}
          </div>
      )
    }

  }

  // We use Link to so when we want to redirect to another page we dont have to reload the window but make it a single page compenent. we just switch which compoenent to render
  render() {
    return (
      <div className="search-field-container">
        {/* className="menuItems" */}
        <div className={this.state.isResponsive ? "topnav responsive" : "topnav"} id="myTopnav">

          <a className="active">
            <Link to={{
              pathname: `/`,

            }}> Home </Link>
          </a>

          <a >
            <Link to={{
              pathname: `/watchlater`,

            }}> Watch Later </Link>

          </a>

          <a >

            <form onSubmit={this.onSearch.bind(this)}>
              <input
                className="search-input"
                type="search"
                placeholder="Search..."
                onChange={this.handleSearchInputChange}
              />
              <button type="submit"><FaSearch className="search-icon" /></button>
            </form>
          </a>

          <a>

            <span className="span-class">
              <div >
                <img src="avatar.png" alt="Avatar" className="avatar" />
              </div>

              <Link to={{
                pathname: `/profile`,

              }}>  {this.props.username}  </Link>
            </span>
          </a>


          <a href="javascript:void(0);" className="icon" onClick={this.operNavMenu}>
            <TiThMenu className="search-icon" />
          </a>
        </div>

        {this.state.displayPopUp ? <PopUp message={this.state.messageOnPopUp} toggle={this.togglePop} /> : null}

        <Switch>
          <Route path='/watchlater' component={WatchLaterComponent} />
          <Route path='/profile' component={ProfileComponent} />

          {this.renderData()}



        </Switch>

      </div>
    );
  }
}

export default SearchComponent;