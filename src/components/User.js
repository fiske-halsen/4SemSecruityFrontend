import facade from "../utils/apiFacade";
import React, { useState, useEffect } from "react";

const User = () => {
  let allCarsObj = {
    cars: [{ brand: "", model: "", year: "", pricePerDay: "" }],
  };

  const [allCars, setAllCars] = useState(allCarsObj);

  useEffect(() => {
    facade.fetchAllCars.then((cars) => setAllCars(cars));
  }, []);

  return (
    <div>
      <p>Du er logget ind som user og har adgang til denne side</p>
    </div>
  );
};

export default User;
