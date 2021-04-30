import React from "react";
import { NavLink, Route, useParams, useRouteMatch } from "react-router-dom";
import facade from "../utils/apiFacade"

function Header(props) {

  
  return (
    <div>
      <ul className="header">
        {facade.getToken() === null ? (
          <div>
          <li>
          <NavLink exact activeClassName="active" to="/">
            Login
          </NavLink>
        </li>

        <li>
        <NavLink exact activeClassName="active" to="/user">
            Rent a car
          </NavLink>
        </li>
        </div>
                ) : (
                  <div>
                  {(function() {
        switch (facade.getRole()) {
          case 'user':
            return  <div> <li>
          <NavLink exact activeClassName="active" to="/">
            Login
          </NavLink>
        </li>

        <li>
        <NavLink exact activeClassName="active" to="/user">
            Rent a car
          </NavLink>
        </li>
        </div>
          case 'admin':
            return  <div> <li>
          <NavLink exact activeClassName="active" to="/">
            Login
          </NavLink>
        </li>

        <li>
        <NavLink exact activeClassName="active" to="/user">
            All rentals
          </NavLink>
        </li>
        </div>
          default:
            return <p>Du er ikke logget ind</p>;
        }
      })()})
      </div>
                )}
                

      </ul>
    </div>
  );
}

export default Header;
