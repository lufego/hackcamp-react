import React from "react";
import PropTypes from "prop-types";
import filters from "../mocks/filters";
import { MovieList } from "./MovieList";
import { SideBarFilters } from "./SideBarFilters";
import { FilterMenu } from "./FilterMenu";
import { movie } from "../types/movie";
import { movieContainsGenre, getGenreId } from "../libs/utils";

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters,
      searchValue: null,
      navClosed: true,
      selectedFilter: "All",
      filteredList: []
    };
  }

  componentDidMount() {
    const { searchValue, selectedFilter } = this.state;
    const { movies } = this.props;
    this.filterMovies({
      searchValue,
      selectedFilter,
      movies
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies !== this.props.movies) {
      this.filterMovies(nextProps);
    }
  }

  selectTab = category => {
    this.setState(
      {
        filters: filters.map(filter => {
          filter.selected = filter.category === category;
          return filter;
        }),
        selectedFilter: category
      },
      () => {
        const { searchValue, selectedFilter } = this.state;
        const { movies } = this.props;
        this.filterMovies({ searchValue, selectedFilter, movies });
      }
    );
  };

  closeSideBar = () => {
    this.setState({
      navClosed: true
    });
  };

  openSideBar = () =>
    this.setState({
      navClosed: false
    });

  search = event => {
    this.setState({ searchValue: event.target.value }, () => {
      const { searchValue, selectedFilter } = this.state;
      const { movies } = this.props;
      this.filterMovies({ searchValue, selectedFilter, movies });
    });
  };

  filterMovies = ({ searchValue, selectedFilter, movies }) => {
    const filteredList = movies.filter(
      movie =>
        (selectedFilter === "All" ||
          movieContainsGenre(movie, getGenreId(selectedFilter))) &&
        (!searchValue ||
          movie.title.toLowerCase().includes(searchValue.toLowerCase()))
    );
    this.setState({
      filteredList
    });
  };

  render() {
    const {
      filters,
      navClosed,
      selectedFilter,
      searchValue,
      filteredList
    } = this.state;

    const { addToCart, isInCart, removeFromCart, movies } = this.props;

    return (
      <main className="main-content">
        <FilterMenu
          counter={filteredList.length}
          filters={filters}
          selectTab={this.selectTab}
          selectPage={this.props.selectMovie}
        />

        <MovieList
          updateCounter={this.updateCounter}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          isInCart={isInCart}
          selectMovie={this.props.selectMovie}
          movies={filteredList}
          selectedFilter={selectedFilter}
          searchValue={searchValue}
          navClosed={navClosed}
        />

        <SideBarFilters
          navClosed={navClosed}
          closeSideBar={this.closeSideBar}
          onChange={this.search}
          openSideBar={this.openSideBar}
        />
      </main>
    );
  }
}

Main.propTypes = {
  movies: PropTypes.arrayOf(movie).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  selectMovie: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  isInCart: PropTypes.func.isRequired
};
