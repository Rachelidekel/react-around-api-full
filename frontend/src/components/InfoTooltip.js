import React from "react";
import PopupWithForm from "./PopupWithForm";
import SuccessIcon from "../images/success-icon.svg";
import FailureIcon from "../images/failure-icon.svg";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="tooltip"
      name="tooltip"
    >
      {status === "success" ? (
        <div className="form__control form__control_type_tooltip">
          <img
            className="tooltip__icon-sign"
            src={SuccessIcon}
            alt="a sign of success"
          />
          <p className="tooltip__status-message">
            Success! You have now been registered.
          </p>
        </div>
      ) : (
        <div>
          <img
            className="tooltip__icon-sign"
            src={FailureIcon}
            alt="a sign of failure"
          />
          <p className="tooltip__status-message">
            Oops, something went wrong! Please try again.
          </p>
        </div>
      )}
    </PopupWithForm>
  );
}

export default InfoTooltip;
