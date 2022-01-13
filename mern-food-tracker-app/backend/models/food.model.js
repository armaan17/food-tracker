const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//food schema consists of username, description, price, date
const foodSchema = new Schema({
    username: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true,//displays timestamps 
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

