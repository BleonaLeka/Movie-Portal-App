export default class Helper{


    static MovieObject = [];

    constructor(){
    }


    static appendMovieObject(object){
        this.MovieObject.push(object);
    }

    static getMovieObject(){
        return this.MovieObject;
    }
}
