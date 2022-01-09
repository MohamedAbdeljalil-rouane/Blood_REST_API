const mongoose = require("mongoose");

const bloodType = {
    plus: Number,
    minus: Number
}

const citySchema = mongoose.Schema({
    cityName: {
        type: String,
        required: true,
        },
    total: {
         type: Number, 
         required: true
         },
    typeA: bloodType,
    typeB: bloodType,
    typeAB: bloodType,
    typeO: bloodType

});



// userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("City", citySchema);
