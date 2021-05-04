import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import facade from "../utils/apiFacade";
import React, { useState, useEffect } from "react";
import { rentCarObj } from "../utils/types";

const RentCar = ({ allCars, setReloadTable }) => {
  let { model } = useParams();

  const [carToRent, setCarToRent] = useState(rentCarObj);
  useEffect(() => {
    allCars.cars.forEach((car) => {
      if (car.model === model) {
        setCarToRent({ ...car, userName: facade.getUserName() });
      }
    });
    setReloadTable(false);
  }, [model]);

  const onChange = (evt) => {
    setCarToRent({ ...carToRent, [evt.target.id]: evt.target.value });
    console.log(carToRent);
  };

  const rentCar = (evt) => {
    evt.preventDefault();
    facade.addRental(carToRent);
    console.log(carToRent);
    setCarToRent({ ...carToRent });
    setReloadTable(true);
  };

  return (
    <div>
      {" "}
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="name">
            Username
          </label>
          <div className="col-sm-5">
            <input
              className="form-control sm disabled"
              id="userName"
              value={facade.getUserName()}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="dateofbirth">
            Brand
          </label>
          <div className="col-sm-5 disabled">
            <input
              className="form-control"
              id="brand"
              value={carToRent.brand}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="info">
            Model
          </label>
          <div className="col-sm-5 disabled">
            <input
              className="form-control"
              id="model"
              value={carToRent.model}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="Breed">
            Year
          </label>
          <div className="col-sm-5">
            <input
              className="form-control disabled"
              id="year"
              value={carToRent.year}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="Breed">
            Price per day
          </label>
          <div className="col-sm-5">
            <input
              className="form-control disabled"
              id="PricePerDay"
              value={carToRent.pricePerDay}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="Breed">
            Rental days
          </label>
          <div className="col-sm-5">
            <input
              className="form-control"
              id="rentalDays"
              placeholder={carToRent.rentalDays}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button onClick={rentCar} type="submit" className="btn btn-primary">
              Rent car
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RentCar;
