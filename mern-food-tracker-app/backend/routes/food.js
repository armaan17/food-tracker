const router = require('express').Router();
let Food = require('../models/food.model');

//get food
router.route('/').get((req, res) => {
    Food.find()
        .then(food => res.json(food))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add new foods
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const location = req.body.location;
    const description = req.body.description;
    const price = Number(req.body.price);
    const date = Date.parse(req.body.date);

    const newFood = new Food({
        username,
        location,
        description,
        price,
        date,
    });

    newFood.save()
        .then(() => res.json('Food added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete foods
router.route('/:id').delete((req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(() => res.json('Food deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;