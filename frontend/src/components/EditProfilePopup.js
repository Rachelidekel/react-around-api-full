import React, { useState, useEffect } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onUpdateUser, onClose, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Edit profile"
      name="edit-profile"
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
    >
      <div className="form__control">
        <input
          type="text"
          className="form__input form__input_type_name"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span id="name-error" className="popup__error"></span>
      </div>
      <input
        type="text"
        className="form__input form__input_type_job"
        id="about-me"
        name="job"
        placeholder="About me"
        required
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span id="about-me-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
