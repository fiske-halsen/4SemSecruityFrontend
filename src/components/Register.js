import React, { useState, useEffect } from "react";
import facade from "../utils/apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import { storage } from "../firebase/index";
import ReCAPTCHA from "react-google-recaptcha";

function Register({ register }) {
  const init = { username: "", password1: "", password2: "" };
  const [registerCredentials, setRegisterCredentials] = useState(init);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [reToken, setReToken] = useState("");
  const [url, setUrl] = useState("");

  const performRegister = (evt) => {
    evt.preventDefault();

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            register(
              registerCredentials.username,
              registerCredentials.password1,
              registerCredentials.password2,
              reToken,
              url
            );
          });

        console.log(url);
      }
    );
    setReToken("");
  };

  const onChangeRecap = (value) => {
    setReToken(value);
  };

  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const onChange = (evt) => {
    setRegisterCredentials({
      ...registerCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Register</h2>
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
              id="password1"
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="control-label col-sm-3" htmlFor="Breed">
              Password
            </label>
            <div className="col-sm-2">
              <input
                type="password"
                className="form-control"
                id="password2"
                placeholder="Password"
                onChange={onChange}
              />
            </div>
          </div>
          <input type="file" onChange={onChangeImage} />
          <progress value={progress} max="100" />
          <div className="form-group mt-3">
            <div className="col-sm-offset-3 col-sm-9">
              <ReCAPTCHA
                sitekey="6LfiyusaAAAAAPNN314dKor_W6Ni8a0VGu0yHJNc"
                onChange={onChangeRecap}
              />
              <button
                onClick={performRegister}
                type="submit"
                className="btn btn-primary"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
