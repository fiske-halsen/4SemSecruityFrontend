import facade from "../utils/apiFacade";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RentCar from "./RentCar";
import {
  NavLink,
  Link,
  Route,
  useParams,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import { allCarsObj } from "../utils/types";

const User = ({ reloadTable, setReloadTable }) => {
  const [allCars, setAllCars] = useState(allCarsObj);
  const { path, url } = useRouteMatch();

  useEffect(() => {
    facade.fetchAllCars().then((cars) => setAllCars(cars));
  }, [reloadTable]);

  return (
    <div>
      <Switch>
        <Route path={`${path}/:model`}>
          <RentCar allCars={allCars} setReloadTable={setReloadTable} />
        </Route>
        <Route exact path={path}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Year</th>
                <th scope="col">PricePerDay</th>
              </tr>
            </thead>
            <tbody>
              {allCars.cars.map((car, index) => (
                <tr>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.pricePerDay}</td>
                  <button type="button">
                    {facade.getToken() ? (
                      <NavLink id={car.model} to={`${url}/${car.model}`}>
                        Rent car
                      </NavLink>
                    ) : (
                      <Link to={`/`}>Rent car</Link>
                    )}
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

export default User;
