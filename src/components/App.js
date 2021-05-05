import React, { useState } from "react";
import facade from "../utils/apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import AllRentals from "./AllRentals";
import AllCars from "./AllCars";
import { Switch, Route } from "react-router-dom";
import MyRentals from "./MyRentals";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [reloadTable, setReloadTable] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true), setError(""))
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <div>
      <Header token={facade.getToken()} />
      <Switch>
        {!loggedIn ? (
          <div>
            <Route exact path="/">
              <LogIn login={login} />
              <p>{error}</p>
            </Route>
            <Route exact path="/rentcar">
              <AllCars />
            </Route>
          </div>
        ) : (
          <div>
            <div>
              <Route exact path="/">
                <LoggedIn />
                <button onClick={logout}>Logout</button>
              </Route>
            </div>
            <div>
              <Route path="/myrentals">
                {" "}
                <MyRentals
                  reloadTable={reloadTable}
                  setReloadTable={setReloadTable}
                />{" "}
              </Route>

              <Route path="/rentcar">
                {(function () {
                  switch (facade.getRole()) {
                    case "user":
                      return (
                        <AllCars
                          reloadTable={reloadTable}
                          setReloadTable={setReloadTable}
                        />
                      );
                    case "admin":
                      return (
                        <AllRentals
                          reloadTable={reloadTable}
                          setReloadTable={setReloadTable}
                        />
                      );
                    default:
                      return (
                        <AllCars
                          reloadTable={reloadTable}
                          setReloadTable={setReloadTable}
                        />
                      );
                  }
                })()}
              </Route>
            </div>
          </div>
        )}
      </Switch>
    </div>
  );
}
export default App;
