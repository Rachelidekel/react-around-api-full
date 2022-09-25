import { useState } from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/Vector.svg";

function Header({ onLogOut, email }) {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsHeaderMenuOpen((open) => !open);
  }

  function handleLogOut() {
    setIsHeaderMenuOpen(false);
    onLogOut();
  }

  return (
    <header className="header">
      <div
        className={
          isHeaderMenuOpen
            ? "header__wrapper-mobile-open"
            : "header__wrapper-mobile"
        }
      >
        <p className="header__user-email">{email}</p>
        <button className="header__logout" onClick={handleLogOut}>
          Log out
        </button>
      </div>
      <div className="header__wrapper header__wrapper_type_mobile">
        <img src={logo} alt="Around The U.S." className="logo" />
        <div className="header__button-wrapper">
          <Route exact path="/">
            <button
              className={
                isHeaderMenuOpen
                  ? "header__button header__close-button"
                  : "header__button header__hamburger-menu"
              }
              onClick={handleMenuClick}
            ></button>
            <div className="header__wrapper-desktop">
              <p className="header__user-email">{email}</p>
              <button className="header__logout" onClick={handleLogOut}>
                Log out
              </button>
            </div>
          </Route>
        </div>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Log in
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Sign up
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
