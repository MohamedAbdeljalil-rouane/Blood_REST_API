const City = require("../models/City");



exports.getTotalStockByCity = (req, res) => {
    City.findOne({
        cityName: req.query.cityName
    })
    .then((city)=> {
        console.log(city);
        res.json({cityName: city.cityName, total: city.total})
    })
    .catch((error)=>res.json(error))
}

exports.getPercentageByCity = (req, res) => {
    City.findOne({
        cityName: req.query.cityName
    })
    .then((city)=> {
        console.log(city);
        res.json({cityName: city.cityName, PercentageBySGroup: Math.floor(city[req.query.group][req.query.sGroup]*req.query.percentage/100) })
    })
    .catch((error)=>res.json(error))
}

exports.createCity = (req, res) => {
    console.log(req.body)
    const newCity = City({
        cityName: req.body.cityName,
        typeA: {
            plus: req.body.typeA["plus"],
            minus: req.body.typeA["minus"]
        },
        typeB: {
            plus: req.body.typeB["plus"],
            minus: req.body.typeB["minus"]
        },
        typeAB: {
            plus: req.body.typeAB["plus"],
            minus: req.body.typeAB["minus"]
        },
        typeO: {
            plus: req.body.typeO["plus"],
            minus: req.body.typeO["minus"]
        },
    })

    newCity.total = newCity.typeA.plus + newCity.typeA.minus
     + newCity.typeB.plus + newCity.typeB.minus
      + newCity.typeAB.plus + newCity.typeAB.minus
       + newCity.typeO.plus + newCity.typeO.minus
    newCity.save()
    .then(()=> res.json({message: "City created successfully"}))
}


