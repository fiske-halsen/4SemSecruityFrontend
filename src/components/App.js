import React, { useState } from "react";
import facade from "../utils/apiFacade";
import LogIn, { LoggedIn } from "./LogIn.js";
import Header from "./Header.js";
import Admin from "./Admin.js";
import AllCars from "./AllCars";
import { Switch, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  //const [role, setRole] = useState("");

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
            <Route exact path="/user">
              <AllCars/>
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
              <Route path="/user">
                {(function() {
        switch (facade.getRole()) {
          case 'user':
            return <AllCars />;
          case 'admin':
            return <Admin />;
          default:
            return <AllCars />;
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
