const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const TechnicienSchema = mongoose.Schema({
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
module.exports = mongoose.model("Technicien", TechnicienSchema);
