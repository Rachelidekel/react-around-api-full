import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlaceSubmit, onClose, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="New place"
      name="add-place"
      buttonText={`${isLoading ? "Creating..." : "Create"}`}
    >
      <div className="form__control">
        <input
          type="text"
          className="form__input form__input_type_card-title"
          id="card-title"
          name="name"
          placeholder="Title"
          required
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span id="card-title-error" className="popup__error"></span>
      </div>
      <input
        type="url"
        className="form__input form__input_type_card-link"
        id="card-link"
        name="link"
        placeholder="Image link"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span id="card-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
