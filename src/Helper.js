export default class Helper{

/*
    This class has static attributes MovieObject and WatchLaterMovieObject Arrays to store
    movies for each category and use it all over the react components.
    Its plays the role of a container and everytime we need these data we use meethods of this class.
*/
    static MovieObject = [];

    static WatchLaterMovieObject = [];

    // 
    constructor(){
    }
    /*
        The reason we use static methods and attributes is that we dont really need an object of this class,
        but create static attributes to create it once for the class.
    */

    // This method takes a movie and append it on the list of MovieObject
    static appendMovieObject(movie){
        this.MovieObject.push(movie);
    }

    // returns list of all movies saved to the movieObject list. We access it with this. since its part of this class only
    static getMovieObject(){
        return this.MovieObject;
    }
    
    // The way we remove a movie from the list. 
    static removeMovieObject(item){
        // Filter the list of movies and take only the elements != the movie to be deleted 
        // and assign the value to the list again.
        this.MovieObject = this.MovieObject.filter(movieItem => movieItem != item)
    }

/*
    Methods implementation for watch later movie list 
    The implementataion is the same just change the list name to this.watchlatermovieObject

*/
    static appendWatchLaterObject(movie){
        this.WatchLaterMovieObject.push(movie);
    }

    static getWatchLaterMovieObject(){
        return this.WatchLaterMovieObject;
    }
    static removeWatchLaterMovieObject(item){
        this.WatchLaterMovieObject = this.WatchLaterMovieObject.filter(movieItem => movieItem != item)
    }
}
