import React, { Component } from 'react';
import Card from '../../Card/Card';
import './SearchComponent.css';
import { FaSearch } from "react-icons/fa";
import {Link, Route, Switch} from 'react-router-dom';
import AboutComponent from '../../About/AboutComponent';
import ProfileComponent from '../../Profile/ProfileComponent';
import PopUp from "../../PopUp/PopUpComponent"; 

import MOVIES  from '../../../test/movies';
class SearchComponent extends Component {

  constructor(props) {
    super(props);
    this.child = React.createRef();

    this.state = {
      searchText: "",
      // Object to store data taken from fetch request.
      movieList: MOVIES.data,
      favoriteList: [],
      watchLaterList: [],
      displayPopUp: false,
      messageOnPopUp: '',
      MOVIEAPI: `https://api.themoviedb.org/3/movie/popular`,
      API_KEY: 'd2b226dfd108f4906912a1dca70487b8', /// API to call for loading most popular movies 

    };

  }


  // This is called after every element is rendered 
  /*
    In this part we load our data from api
  */
  componentDidMount() {
    this.fetchMovies();
    // this.timer = setInterval(() => this.fetchUsers(), 5000);
  }

  fetchMovies = () => {
    fetch(`${this.state.MOVIEAPI}?api_key=${this.state.API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if(data.results.length != 0){
          console.log("---: ", data.results);
          this.setState({ movieList: data.results });
        }
        else {
          // EX: If search is inappropriate, tell user to search sth meaningful
          alert("Search sth meaningful")
        }
      })
      .catch((e) => {
        //Display error in console if catches error
        console.log(e);
      });
  }

 
  //Mos e prek per momentin 
  requestHandler(search) {
    const WIKIPEDIA_API = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${search}&prop=info&inprop=url&utf8=&format=json&srlimit=5`;
    fetch(WIKIPEDIA_API)
      .then(response => response.json())
      .then(data => {
        if(data.query.search.length != 0)
          this.setState({ wikipediaList: data.query.search });
        else {
          // EX: If search is inappropriate, tell user to search sth meaningful
          alert("Search sth meaningful")
        }
      })
      .catch((e) => {
        //Display error in console if catches error
        console.log(e);
      });
  }

  handleSearchInputChange = (e) => {
    this.setState({ searchText: e.target.value })
    let search_ = this.state.searchText
    if (search_.length > 3) {
      this.requestHandler(e.target.value);
    }
  }


  onSearch(e){
    e.preventDefault();
    if(this.state.searchText) {
      this.requestHandler(this.state.searchText);
    } else
      // Display Note or warning : 
      // EX:  If search input is empty tell user to type sth
      alert("Warning")
  }

  // toggle when close 
  togglePop = () => {
    this.setState({
     displayPopUp: false
    });
   };

  // method to append movie to watch list 
  
  saveToFavoriteList(item){
    this.child.current.changeSaveButtonToDisable();
    

    // Check if movie is set to list 
    if(this.state.favoriteList.includes(item)){
      console.log(`'${item.title}' movie is on your List`);
      this.setState({
        displayPopUp: true,
        messageOnPopUp: `'${item.title}' movie is on your favorite List`
      })

    } else {
      console.log("Movie to save: ", item);
      var list  = []
      list = this.state.favoriteList;
      list.push(item)
      this.setState({
        favoriteList: list
      })
    }
    
  }

  saveToWatchLaterList(item){
    this.child.current.changeSaveWatchLaterToDisable();

    // Check if movie is set to list 
    if(this.state.watchLaterList.includes(item)){
      console.log(`'${item.title}' movie is on your List`);
      this.setState({
        displayPopUp: true,
        messageOnPopUp: `'${item.title}' movie is on your watch Later List`
      })

    } else{
      console.log("Movie to watch later: ", item);
      var list  = []
      list = this.state.watchLaterList;
      list.push(item)
      this.setState({
        watchLaterList: list
      })
    }
   
  }
  //other way to render some data
  renderData() {
    if (this.state.movieList.length > 0) {
      return (
        <div className="searchlist-container">
          <h1>We have found some results for you</h1>
          <div className="cards">
            {this.state.movieList.map(((item) => (
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

  render() {
    return (     
      <div className="search-field-container">
        <nav>
          <ul className="menuItems">
            <span> 
              <li><a className="active" href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li>
                  <form onSubmit= {this.onSearch.bind(this)}>
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Search..."
                      onChange={this.handleSearchInputChange}
                    />
                    <button type="submit"><FaSearch className="search-icon"/></button>
                  </form>
                 
              </li>
            </span>
            <span>
                <div>
                  <img src="avatar.png" alt="Avatar" className="avatar"/>
                </div>
                <Link to={{ 
                      pathname: `/profile`, 
                       
                      data: JSON.stringify(this.state.favoriteList)
                      
                    }}>  {this.props.username}  </Link>
               {/* <li className="profile"><a href="/profile"></a></li> */}
            </span>
          </ul>
        </nav>

        {this.state.displayPopUp ? <PopUp message={this.state.messageOnPopUp} toggle={this.togglePop} /> : null}

        <Switch>
          <Route path='/about' component={AboutComponent} />
          <Route path='/profile' component={ProfileComponent} />

          {this.renderData()}


         
        </Switch>

      </div>
    );
  }
}

export default SearchComponent;