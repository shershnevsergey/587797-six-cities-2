import React from 'react';
import PropTypes from 'prop-types';
import {maxRatingValue} from "../../mocks/offers";

export const Card = (props) => {
  const {offer, onTitleClick, onCardHover} = props;
  const {
    title,
    previewImage,
    isPremium,
    isFavorite,
    type,
    price,
    rating
  } = offer;

  return <article className="cities__place-card place-card" onMouseOver={(evt) => {
    onCardHover(evt.currentTarget);
  }}>
    {isPremium
      ? <div className="place-card__mark">
        <span>Premium</span>
      </div>
      : ``}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <a href="#">
        <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button ${isFavorite ? `place-card__bookmark-button--active` : ``}`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"> </use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${Math.round(rating * 100 / maxRatingValue)}%`}}> </span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <a href="#" onClick={onTitleClick}>{title}</a>
      </h2>
      <p className="place-card__type">{type}</p>
    </div>
  </article>;
};

export const offerPropTypes = PropTypes.shape({
  title: PropTypes.oneOf([
    `Beautiful & luxurious apartment at great location`,
    `Wood and stone place`,
    `Canal View Prinsengracht`,
    `Nice, cozy, warm big bed apartment`
  ]).isRequired,
  previewImage: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([`Apartment`, `Private room`]),
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
});

Card.propTypes = {
  offer: offerPropTypes,
  onTitleClick: PropTypes.func,
  onCardHover: PropTypes.func
};