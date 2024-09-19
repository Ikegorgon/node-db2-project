// DO YOUR MAGIC
const router = require('express').Router();
const MIDDLEWARE = require('./cars-middleware');
const CARS = require('./cars-model');

router.get('/', (req, res, next) => {
    CARS.getAll()
        .then(car => {
            res.status(200).json(car);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', MIDDLEWARE.checkCarId, (req, res, next) => {
    CARS.getById(req.params.id)
        .then(car => {
            res.status(200).json(car[0]);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', MIDDLEWARE.checkCarPayload, MIDDLEWARE.checkVinNumberValid, MIDDLEWARE.checkVinNumberUnique, (req, res, next) => {
    CARS.create(req.body)
        .then(car => {
            CARS.getById(car[0])
                .then(c => {
                    res.status(201).json(c[0])
                })
        })
        .catch(err => {
            next(err);
        })
})

router.put('/:id', MIDDLEWARE.checkCarId, MIDDLEWARE.checkCarPayload, (req, res, next) => {
    CARS.updateById(req.params.id)
        .then(car => {
            res.status(200).json(car);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', MIDDLEWARE.checkCarId, (req, res, next) => {
    CARS.deleteById(req.params.id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            next(err);
        })
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message, error: err});
    next();
})

module.exports = router;