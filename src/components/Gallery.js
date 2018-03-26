import React from "react";
import { Movie } from "./Movie";


export const Gallery = ({ movies }) => (
  <section className="gallery">
    {movies.map(movie => (
      <Movie
        key={movie.id}
        data={movie}
        selectMovie={() => {
          alert("Movie clicked");
        }}
      />
    ))}
  </section>
);
