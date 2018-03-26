import React, { Component } from "react";
import logo from "./images/hackflix_logo.svg";
import filters from "./mocks/filters";
import "./css/Header.css";
import movies from "./mocks/movies";
import genres from "./mocks/genres";
import { Movie } from "./components/Movie";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { Filters } from "./components/Filters";
import { SideBar } from "./components/SideBar";

const matchCategoryWithId = name =>
  genres.find(genre => genre.name === name).id;

const filterByCategory = (category, movie) =>
  movie.genre_ids.includes(matchCategoryWithId(category));

export class App extends Component {
  state = {
    movies,
    filters
  };

  selectTab = category => {
    if (category === "All") {
      return this.setState({
        movies: movies,
        filters: this.state.filters.map(
          filter => {
            filter.selected = filter.category === category
            return filter;
          }
        )
      });
    }
    this.setState({
      movies: movies.filter(movie => filterByCategory(category, movie)),
      filters: this.state.filters.map(
        filter => {
          filter.selected = filter.category === category
          return filter;
        }
      )
    });
    // We need to update the `selected` property of the clicked category to be true.
    // We should also filter the movies which are passed to the movie list
  };

  openSideBar = () => {
    // We need to toggle the state of the sidebar here to make sure it is in an open state
  };

  render() {
    const { movies, filters } = this.state;

    return (
      <div>
        <Header />
        <main className="main-content">
          <Filters filters={filters} selectTab={this.selectTab} />

          {/*If the sidebar is open you need to add the css class filter-is-visible to the div below*/}
          <Gallery movies={movies} />

          <SideBar />
        </main>
      </div>
    );
  }
}
