import facade from "../utils/apiFacade";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Route, useRouteMatch, Switch } from "react-router-dom";

import { allRentalsObj } from "../utils/types";

const MyRentals = ({ reloadTable, setReloadTable }) => {
  const [allRentals, setAllRentals] = useState(allRentalsObj);

  useEffect(() => {
    facade
      .fetchAllRentalsOneUser(facade.getUserName())
      .then((rentals) => setAllRentals(rentals));
    setReloadTable(false);

    console.log(allRentals);
  }, [reloadTable]);

  return (
    <div>
      <table class="table">
        <thead>
          <tr>
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
              <td>{rental.rentalDays}</td>
              <td>{rental.rentalDate}</td>
              <td>{rental.totalRentalPrice}</td>
              <td>{rental.brand}</td>
              <td>{rental.model}</td>
              <td>{rental.year}</td>
              <td>{rental.pricePerDay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRentals;
