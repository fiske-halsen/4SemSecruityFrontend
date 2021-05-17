import React, { useState, useEffect, useRef } from "react";
import facade from "../utils/apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import ReCAPTCHA from "react-google-recaptcha";
function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [reToken, setReToken] = useState("");

  const performLogin = async (evt) => {
    evt.preventDefault();

    login(loginCredentials.username, loginCredentials.password, reToken);
    setReToken("");
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  const onChangeRecap = (value) => {
    setReToken(value);
    console.log(value);
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="Breed">
            Username
          </label>
          <div className="col-sm-2">
            <input
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="Breed">
            Password
          </label>
          <div className="col-sm-2">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <div className="col-sm-offset-3 col-sm-9">
              <ReCAPTCHA
                sitekey="6LfPttgaAAAAAIeRoR1vBgLGKXKee0367pPuGKek"
                onChange={onChangeRecap}
              />
              <button
                onClick={performLogin}
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade.fetchData().then((data) => setDataFromServer(data.msg));
  }, [dataFromServer]);

  return (
    <div>
      <h2>Welcome to our SP car rental</h2>
      <h3>{dataFromServer}</h3>
    </div>
  );
}

export default LogIn;
export { LoggedIn };
