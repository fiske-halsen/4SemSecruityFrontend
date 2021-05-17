import React, { useState, useEffect, useRef } from "react";
import facade from "../utils/apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import ReCAPTCHA from "react-google-recaptcha";
function LogIn({ login }) {
  const init = { username: "", password: "", retoken: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const reRef = useRef();

  const performLogin = async (evt) => {
    evt.preventDefault();
    //const token = await reRef.current.executeAsync();
    //console.log("---------------" + token);
    setLoginCredentials({ ...loginCredentials, retoken: "token" });
    login(
      loginCredentials.username,
      loginCredentials.password,
      loginCredentials.retoken
    );
    console.log("aaaaaaaa         " + loginCredentials.retoken);
    //reRef.current.reset();
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
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
                sitekey="6LfliNgaAAAAAGgsgBd7tHREZC8b2pewXlBsVkT1"
                size="invisible"
                ref={reRef}
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
