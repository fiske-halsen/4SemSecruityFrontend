import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import facade from "../utils/apiFacade";
import React, { useState, useEffect } from "react";
import { rentalObj, allCarsObj, carObj } from "../utils/types";

const EditRental = ({ allRentals }) => {
  let { id } = useParams();

  const [rentalToEdit, setRentalToEdit] = useState(rentalObj);
  const [allCars, setAllCars] = useState(allCarsObj);
  const [selectedCar, setSelectedCar] = useState(carObj);

  useEffect(() => {
    facade.fetchAllCars().then((cars) => setAllCars(cars));
  }, []);

  useEffect(() => {
    allRentals.rentals.forEach((rental) => {
      if (rental.id == id) {
        setRentalToEdit({ ...rental, userName: rental.userName, id: id });
        setSelectedCar({
          ...selectedCar,
          brand: rental.brand,
          model: rental.model,
          year: rental.year,
          pricePerDay: rental.pricePerDay,
        });
      }
    });
  }, [id]);

  const onChangeRental = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value);
    setRentalToEdit({ ...rentalToEdit, [evt.target.id]: evt.target.value });
  };

  const onChangeCar = (evt) => {
    evt.preventDefault();
    const model = evt.target.value;
    allCars.cars.forEach((car) => {
      if (car.model === model) {
        setSelectedCar({ ...car });
      }
    });

    console.log(selectedCar);
  };

  const editRental = (evt) => {
    evt.preventDefault();
    facade.editRental(rentalToEdit);
    console.log(rentalToEdit);
    setRentalToEdit({
      ...rentalToEdit,
      brand: selectedCar.brand,
      model: selectedCar.model,
      year: selectedCar.year,
      pricePerDay: selectedCar.pricePerDay,
    });
  };

  return (
    <div>
      {" "}
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="Breed">
            Rental days
          </label>
          <div className="col-sm-5">
            <input
              className="form-control"
              id="rentalDays"
              placeholder={rentalToEdit.rentalDays}
              onChange={onChangeRental}
            />
          </div>
        </div>
        <div class="form-row align-items-center">
          <div class="col-auto my-1">
            <label class="mr-sm-2 mt-3 mb-3" for="inlineFormCustomSelect">
              Edit car
            </label>
            <select
              class="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              value={selectedCar.model}
              onChange={onChangeCar}
            >
              {allCars.cars.map((car) => (
                <option value={car.model}>{car.model}</option>
              ))}
            </select>
          </div>
          <div class="col-auto my-1"></div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button
              onClick={editRental}
              type="submit"
              className="btn btn-primary"
            >
              Edit rental
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRental;
