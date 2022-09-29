import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopupForm from "./DeletePopupForm";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const history = useHistory();

  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.user.email);
            setIsLoggedIn(true);
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    api
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch(console.log);
  }, [token]);

  useEffect(() => {
    api
      .getInitialCards(token)
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, [token]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePreviewOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePreviewOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo({ name, about }, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .setUserAvatar(avatar, token)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id, token)
      .then(() => {
        setCards((cards) =>
          cards.filter((currentCard) => currentCard._id !== selectedCard._id)
        );
        closeAllPopups();
      })

      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  //function handleAddPlaceSubmit(card) {
  //setIsLoading(true);
  //api
  //.createCard(card, token)
  //.then((newCard) => {
  //setCards([newCard, ...cards]);
  //closeAllPopups();
  //})
  //.catch(console.log)
  //.finally(() => setIsLoading(false));
  //}

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .createCard(card, token)
      .then((newCard) => {
        const newCardArray = [...cards];
        newCardArray.push(newCard.data);
        setCards(newCardArray);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => setIsLoading(false));
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res._id) {
          setTooltipStatus("success");
          setIsInfoTooltipOpen(true);
          history.push("/signin");
        } else {
          setTooltipStatus("fail");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogIn({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          setEmail(email);
          history.push("/");
          return res;
        } else {
          setTooltipStatus("fail");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={email} onLogOut={onLogOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={isLoggedIn}>
            <Main
              cards={cards}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteClick={handleDeleteClick}
              onCardLike={handleCardLike}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogIn={onLogIn} />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <DeletePopupForm
          isLoading={isLoading}
          isOpen={isDeletePopupOpen}
          onSubmit={handleCardDelete}
          onClose={closeAllPopups}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePreviewOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
