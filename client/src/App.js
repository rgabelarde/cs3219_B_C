import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJoke from "./components/add-joke.component";
import Joke from "./components/joke.component";
import JokesList from "./components/jokes-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/jokes"} className="navbar-brand">
            Your Jokes
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/jokes"} className="nav-link">
                Jokes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add a joke
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<JokesList />} />
            <Route path="/jokes" element={<JokesList />} />
            <Route path="/add" element={<AddJoke />} />
            <Route path="/jokes/:id" element={<Joke />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
