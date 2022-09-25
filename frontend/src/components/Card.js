import React from "react";
import trash from "../images/Delete_Icon.svg";
import heart from "../images/Vector_heart.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button" : "element_delete-button_disabled"
  }`;

  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `element__title-button ${
    isLiked ? "element__title-button_active" : "element__title-button"
  }`;

  return (
    <li className="element">
      <div className="element__wrapper">
        <img
          src={card.link}
          alt={card.name}
          className="element__item"
          onClick={handleClick}
        />
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        >
          <img
            src={trash}
            alt=" a drawing of a trash can"
            className="element__delete-icon"
          />
        </button>
      </div>
      <div className="element__title">
        <h2 className="element__title-name">{card.name}</h2>

        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          >
            <img
              src={heart}
              alt="a drawing of a heart"
              className="element__title-heart"
            />
          </button>
          <span className="element__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
