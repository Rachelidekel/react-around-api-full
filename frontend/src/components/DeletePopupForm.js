import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopupForm({ isOpen, onSubmit, onClose, isLoading }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
      title="Are you sure?"
      name="delete-form"
      buttonText={`${isLoading ? "Deleting..." : "Yes"}`}
    />
  );
}

export default DeletePopupForm;
