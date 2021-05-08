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
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input placeholder="Password1" id="password1" />
        <input placeholder="Password2" id="password2" />
        <input type="file" onChange={onChangeImage} />
        <button onClick={performRegister}>Register</button>
        <progress value={progress} max="100" />
      </form>
    </div>
  );
}

export default Register;
