import React, { Component } from "react";
import JokeDataService from "../services/joke.service";

export default class AddJoke extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeJoke = this.onChangeJoke.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.saveJoke = this.saveJoke.bind(this);
    this.newJoke = this.newJoke.bind(this);

    this.state = {
      id: null,
      title: "",
      joke: "",
      author: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeJoke(e) {
    this.setState({
      joke: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  saveJoke() {
    var data = {
      title: this.state.title,
      joke: this.state.joke,
      author: this.state.author
    };

    JokeDataService.create(data)
      .then(response => {
        this.setState({
          submitted: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newJoke() {
    this.setState({
      id: null,
      title: "",
      joke: "",
      author: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>

            <button className="btn btn-success" onClick={this.newJoke}>
              Add Another Joke
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Joke</label>
              <input
                type="text"
                className="form-control"
                id="joke"
                required
                value={this.state.joke}
                onChange={this.onChangeJoke}
                name="joke"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}
                name="author"
              />
            </div>
            <button onClick={this.saveJoke} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
