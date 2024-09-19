const CARS = require('./cars-model');

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  CARS.getById(req.params.id)
    .then(car => {
      if(car.length) {
        next();
      } else {
        throw Error("car with id <car id> is not found");
      }
    })
    .catch(err => {
      err.status = 404;
      next(err);
    })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    res.status(400).json({message: "vin is missing"})
  } else if (!req.body.make) {
    res.status(400).json({message: "make is missing"})
  } else if (!req.body.model) {
    res.status(400).json({message: "model is missing"})
  } else if (!req.body.mileage) {
    res.status(400).json({message: "mileage is missing"})
  }
  
  next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  if (req.body.vin.length === 17) {
    next();
  } else {
    const err = { message: `vin ${req.body.vin} is invalid`, status: 400 };
    next(err);
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  CARS.getAll()
    .then(cars => {
      cars.forEach(car => {
        if (car.vin === req.body.vin) {
          throw Error(`vin ${car.vin} already exists`);
        }
      })
      next();
    })
    .catch(err => {
      err.status = 400;
      next(err);
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}