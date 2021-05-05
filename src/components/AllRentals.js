import facade from "../utils/apiFacade";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import EditRental from "./EditRental";
import { allRentalsObj } from "../utils/types";

const AllRentals = ({ reloadTable, setReloadTable }) => {
  const [allRentals, setAllRentals] = useState(allRentalsObj);
  const { path, url } = useRouteMatch();

  useEffect(() => {
    facade.fetchAllRentals().then((rentals) => setAllRentals(rentals));
    setReloadTable(false);
  }, [reloadTable]);

  const deleteRental = (evt) => {
    evt.preventDefault();
    let rentalId = evt.target.id;
    facade.deleteRental(rentalId);
    setReloadTable(true);
  };

  return (
    <div>
      <Switch>
        <Route path={`${path}/:id`}>
          <EditRental allRentals={allRentals} setReloadTable={setReloadTable} />
        </Route>
        <Route exact path={path}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">rentalDays</th>
                <th scope="col">rentalDate</th>
                <th scope="col">TotalRentalPrice</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Year</th>
                <th scope="col">PricePerDay</th>
              </tr>
            </thead>
            <tbody>
              {allRentals.rentals.map((rental, index) => (
                <tr>
                  <td>{rental.userName}</td>
                  <td>{rental.rentalDays}</td>
                  <td>{rental.rentalDate}</td>
                  <td>{rental.totalRentalPrice}</td>
                  <td>{rental.brand}</td>
                  <td>{rental.model}</td>
                  <td>{rental.year}</td>
                  <td>{rental.pricePerDay}</td>
                  <button type="button">
                    <NavLink id={rental.id} to={`${url}/${rental.id}`}>
                      Edit rental
                    </NavLink>
                  </button>

                  <button id={rental.id} onClick={deleteRental} type="button">
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </Route>
      </Switch>
    </div>
  );
};

export default AllRentals;
