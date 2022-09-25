import React from "react";
import Card from "./Card";
import pen from "../images/Vector_pen.svg";
import plus from "../images/Vector_plus.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onDeleteClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatarClick}>
          <div className="profile__avatar-image">
            {currentUser.avatar && (
              <img
                src={currentUser.avatar}
                alt="User's Profile"
                className="profile__image"
              />
            )}
          </div>
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__title-name">{currentUser.name}</h1>
            <button
              className="profile__open-button"
              type="button"
              onClick={onEditProfileClick}
            >
              <img
                src={pen}
                alt="icon of a pen"
                className="profile__open-icon"
              />
            </button>
          </div>
          <p className="profile__subtitle-job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        >
          {" "}
          <img src={plus} alt="icon of a plus" className="profile__add-icon" />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteClick={onDeleteClick}
            />
          ))}
          ;
        </ul>
      </section>
    </main>
  );
}

export default Main;
