import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose, isLoading }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Change Profile Picture"
      name="avatar"
      buttonText={`${isLoading ? "Saving..." : "Save"}`}
    >
      <div className="form__control form__control-avatar">
        <input
          type="url"
          className="form__input form__input_type_avatar-link"
          id="avatar-link"
          name="link"
          placeholder="Image link"
          required
          ref={inputRef}
        />
        <span id="avatar-link-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
