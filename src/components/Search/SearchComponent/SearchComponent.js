import React, { Component } from 'react';
import Card from '../../Card/Card';
import './SearchComponent.css';
import { FaSearch } from "react-icons/fa";
import {Route, Switch} from 'react-router-dom';
import AboutComponent from '../../About/AboutComponent';
import ProfileComponent from '../../Profile/ProfileComponent';
import MOVIES  from '../../../test/movies';
class SearchComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      // Object to store data taken from fetch request.
      movieList: MOVIES.data
    };

    console.log("00: ", MOVIES);
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
               <li className="profile"><a href="/profile">{this.props.username}</a></li>
            </span>
          </ul>
        </nav>
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