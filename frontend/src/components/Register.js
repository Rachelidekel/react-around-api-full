import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }

  return (
    <div className="auth__wrapper">
      <h3 className="auth__title">Sign up</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="auth__input"
          id="auth__email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          className="auth__input"
          id="auth__password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength="2"
          maxLength="30"
          required
        />
        <button className="auth__button" type="submit">
          Sign up
        </button>
        <Link className="auth__link" to="/signin">
          Already a member? Log in here!
        </Link>
      </form>
    </div>
  );
}

export default Register;
