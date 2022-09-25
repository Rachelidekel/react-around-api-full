import React from "react";
import close from "../images/Close_Icon.svg";

function PopupWithForm({
  name,
  onSubmit,
  isOpen,
  onClose,
  title,
  buttonText,
  children,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_type_tooltip"
          type="button"
        >
          <img
            src={close}
            alt="icon of x"
            className="popup__close-icon popup__close-icon_image"
            onClick={onClose}
          />
        </button>
        <h2
          className={`popup__title popup__title_type_${name} ${
            name === "delete-form" ? "popup__title_type_delete" : ""
          }`}
        >
          {title}
        </h2>
        <form
          action="submit"
          className="form popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <div className="form__control"></div>
          <button
            className={`form__button form__button_type_${name} ${
              name === "delete-form" ? "form__button_type_yes" : ""
            }`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
