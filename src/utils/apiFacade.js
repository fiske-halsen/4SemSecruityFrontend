import { URL } from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password, retoken) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
      retoken: retoken,
    });

    console.log(retoken);
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const register = (user, password1, password2, imgUrl) => {
    const options = makeOptions("POST", true, {
      username: user,
      password1: password1,
      password2: password2,
      imgUrl: imgUrl,
    });
    return fetch(URL + "/api/login/register", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const getRole = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let role = decodedJwtData.roles;
    return role;
  };

  const getUserName = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let username = decodedJwtData.username;

    return username;
  };

  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token
    let role = getRole();
    return fetch(URL + "/api/rental/" + role, options).then(handleHttpErrors);
  };

  const fetchAllCars = () => {
    const options = makeOptions("GET");
    return fetch(URL + "/api/rental/getcars/", options).then(handleHttpErrors);
  };
  const fetchAllRentals = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + "/api/rental/getallrentals/", options).then(
      handleHttpErrors
    );
  };

  const fetchAllRentalsOneUser = (userName) => {
    const options = makeOptions("GET", true);
    return fetch(
      URL + "/api/rental/getallrentalsoneuser/" + userName,
      options
    ).then(handleHttpErrors);
  };

  const deleteRental = (id) => {
    const options = makeOptions("DELETE", true);
    return fetch(URL + "/api/rental/deleterental/" + id, options).then(
      handleHttpErrors
    );
  };
  const addRental = (rental) => {
    const options = makeOptions("PUT", true, {
      userName: rental.userName,
      rentalDays: rental.rentalDays,
      brand: rental.brand,
      model: rental.model,
      year: rental.year,
      pricePerDay: rental.pricePerDay,
    }); //True add's the token

    return fetch(URL + "/api/rental/makerental", options).then(
      handleHttpErrors
    );
  };

  const editRental = (rental) => {
    const options = makeOptions("PUT", true, rental); //True add's the token
    return fetch(URL + "/api/rental/editrental", options).then(
      handleHttpErrors
    );
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getRole,
    fetchAllCars,
    fetchAllRentals,
    addRental,
    editRental,
    deleteRental,
    getUserName,
    fetchAllRentalsOneUser,
    register,
  };
}

const facade = apiFacade();
export default facade;
