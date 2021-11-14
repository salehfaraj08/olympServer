const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jumperSchema = new Schema({
    name: String,
    country: String,
    age: Number,
    jumps: Array
});

const jumpersModel = mongoose.model('jumpers',jumperSchema);
module.exports = {
    jumpersModel
};  