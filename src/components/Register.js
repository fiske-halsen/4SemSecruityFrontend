import React, { useState, useEffect } from "react";
import facade from "../utils/apiFacade";
import "bootstrap/dist/css/bootstrap.min.css";
import { storage } from "../firebase/index";

function Register({ register }) {
  const init = { username: "", password1: "", password2: "" };
  const [registerCredentials, setRegisterCredentials] = useState(init);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imgUrl, setUrl] = useState("");

  const performRegister = (evt) => {
    evt.preventDefault();
    setTimeout(() => {
      register(
        registerCredentials.username,
        registerCredentials.password1,
        registerCredentials.password2,
        imgUrl
      );
    }, 1000);
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
          .then((imgUrl) => {
            setUrl(imgUrl);
          });
      }
    );
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
