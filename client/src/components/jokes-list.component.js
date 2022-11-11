import React, { Component } from "react";
import JokeDataService from "../services/joke.service";
import { Link } from "react-router-dom";

export default class JokesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveJokes = this.retrieveJokes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJoke = this.setActiveJoke.bind(this);
    this.removeAllJokes = this.removeAllJokes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      jokes: [],
      currentJoke: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveJokes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveJokes = () => {
    JokeDataService.getAll()
      .then(response => {
        this.setState({
          jokes: response
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJokes();
    this.setState({
      currentJoke: null,
      currentIndex: -1
    });
  }

  setActiveJoke(joke, index) {
    this.setState({
      currentJoke: joke,
      currentIndex: index
    });
  }

  searchTitle() {
    this.setState({
      currentJoke: null,
      currentIndex: -1
    });

    JokeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          jokes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, jokes, currentJoke, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Jokes List</h4>

          <ul className="list-group">
            {jokes &&
              jokes.map((joke, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJoke(joke, index)}
                  key={index}
                >
                  {joke.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentJoke ? (
            <div>
              <h4>Joke</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentJoke.title}
              </div>
              <div>
                <label>
                  <strong>Joke:</strong>
                </label>{" "}
                {currentJoke.joke}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentJoke.author}
              </div>

              <Link
                to={"/jokes/" + currentJoke._id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Joke...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}