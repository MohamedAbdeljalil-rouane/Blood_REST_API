const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        },
    password: {
         type: String, 
         required: true
         },
   
});

// userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Admin", adminSchema);
