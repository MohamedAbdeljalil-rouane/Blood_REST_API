//requiring modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const adminRoutes = require("./app/routes/admin");
const technicienRoutes = require("./app/routes/technicien");
const cityRoutes = require("./app/routes/city");
const transferRoutes = require("./app/routes/transfer");

MONGO_URI = "mongodb://user:user@tdf-shard-00-00.bhish.mongodb.net:27017,tdf-shard-00-01.bhish.mongodb.net:27017,tdf-shard-00-02.bhish.mongodb.net:27017/bloodDb?ssl=true&replicaSet=atlas-iaz3cp-shard-0&authSource=admin&retryWrites=true&w=majority"


const app = express();


//Cors policy :
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Body limits :
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


//Use routes :
app.use("/technicien", technicienRoutes);
app.use("/admin", adminRoutes);
app.use("/cities", cityRoutes);
app.use("/transfer", transferRoutes);

app.get("/", (req, res) => {
  res.send("<h1> Welcome to our API</h1> ");
})

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() =>
    app.listen(8000, () =>
      console.log(`Server Running on: http://localhost:8000`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);



