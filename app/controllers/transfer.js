const City = require("../models/City");

exports.transferBlood = (req,res,next) => {
   
    const role=req.body.role
    const quantity = parseInt(req.query.quantity)
    const bloodType = req.query.bloodType
    City.findOne({
        cityName: req.query.citySource
    })
    .then((citySource)=>{
        City.findOne({
            cityName: req.query.cityDestination
        })
        .then((cityDestination)=>{
            console.log(citySource);
            console.log(cityDestination);
        if(req.body.role==='admin'){
            if(citySource[bloodType.split(".")[0]][bloodType.split(".")[1]] >= quantity){
                citySource[bloodType.split(".")[0]][bloodType.split(".")[1]] -= quantity
                cityDestination[bloodType.split(".")[0]][bloodType.split(".")[1]] = parseInt(cityDestination[bloodType.split(".")[0]][bloodType.split(".")[1]]) + quantity
                cityDestination.total = parseInt(cityDestination.total) + quantity
                citySource.total = parseInt(citySource.total) - quantity

                citySource.save().then(()=>{
                    cityDestination.save().then(()=> res.json({message:"blood recived"}))
                })
                
            }else{
                res.json({message: "cannot make the transfer: stock insuffisant"})
            }

        }else{
            res.json({message:'you are not allowed to make this operation'})
        }
            
             
        }).catch((err)=> {res.json(err)})
    }).catch(err => res.json(err))
}