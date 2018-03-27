import React from 'react';
import PropTypes from 'prop-types';
import {movie} from '../types/movie';
import {addToCart, removeFromCart} from '../actions/cartActions';
import {connect} from 'react-redux';

const shorten = (text, limit = 140) =>
  text
    .split('')
    .slice(0, limit)
    .join('') + '...';

const isInCart = (id, products) =>
  products.reduce((result, nextId) => (result ? result : nextId === id), false);

export const _MovieBody = ({
  addToCart,
  removeFromCart,
  showBody,
  data,
  selectMovie,
  products
}) => (
  <div className={`movie-body ${showBody ? 'show-movie-body' : ''}`}>
    <h1>{data.title}</h1>
    <p>{shorten(data.overview)}</p>
    {isInCart(data.id, products) ? (
      <button
        onClick={() => removeFromCart(data.id)}
        className="btn btn-danger"
      >
        Remove from cart
      </button>
    ) : (
      <button onClick={() => addToCart(data.id)} className="btn add">
        Add to cart
      </button>
    )}
    <button className="btn btn-link" onClick={() => selectMovie(data.id)}>
      See the details
    </button>
  </div>
);

_MovieBody.propTypes = {
  showBody: PropTypes.bool.isRequired,
  data: movie,
  selectMovie: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.number).isRequired
};

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addToCart(id)),
  removeFromCart: id => dispatch(removeFromCart(id))
});

const mapStateToProps = ({cart: {products}}) => ({
  products
});

export const MovieBody = connect(mapStateToProps, mapDispatchToProps)(
  _MovieBody
);
