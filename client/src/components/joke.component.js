import React, { Component } from "react";
import JokeDataService from "../services/joke.service";
import { withRouter } from '../common/with-router';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeJoke = this.onChangeJoke.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.getJoke = this.getJoke.bind(this);
    this.updateJoke = this.updateJoke.bind(this);
    this.deleteJoke = this.deleteJoke.bind(this);

    this.state = {
      currentJoke: {
        id: null,
        title: "",
        joke: "",
        author: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getJoke(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentJoke: {
          ...prevState.currentJoke,
          title: title
        }
      };
    });
  }

  onChangeJoke(e) {
    const joke = e.target.value;

    this.setState(prevState => ({
      currentJoke: {
        ...prevState.currentJoke,
        joke: joke
      }
    }));
  }

  onChangeAuthor(e) {
    const author = e.target.value;

    this.setState(prevState => ({
      currentJoke: {
        ...prevState.currentJoke,
        author: author
      }
    }));
  }

  getJoke(id) {
    JokeDataService.get(id)
      .then(response => {
        this.setState({
          currentJoke: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished() {
    var data = {
      title: this.state.currentJoke.title,
      joke: this.state.currentJoke.joke,
      author: this.state.currentJoke.author
    };

    JokeDataService.update(this.state.currentJoke.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentJoke: {
            ...prevState.currentJoke,
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateJoke() {
    var data = {
      title: this.state.currentJoke.title,
      joke: this.state.currentJoke.joke,
      author: this.state.currentJoke.author
    };

    JokeDataService.update(this.state.currentJoke.id, data)
      .then(response => {
        this.setState(
          {
            currentJoke:
              response,
            message: "The joke was updated successfully!"
          }
        );
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteJoke() {
    JokeDataService.delete(this.state.currentJoke.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/jokes');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentJoke } = this.state;

    return (
      <div>
        {currentJoke ? (
          <div className="edit-form">
            <h4>Joke</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJoke.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="joke">Joke</label>
                <input
                  type="text"
                  className="form-control"
                  id="joke"
                  value={currentJoke.joke}
                  onChange={this.onChangeJoke}
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={currentJoke.author}
                  onChange={this.onChangeAuthor}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteJoke}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateJoke}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Joke...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Joke);