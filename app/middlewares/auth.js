const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require("../config/config")

function getRole (req) {
  try{
    const token = req.headers.authorization.split(" ")[1];
    console,console.log((req.headers.authorization));
    let decodedToken = jwt.verify(token, TOKEN_SECRET);
    return decodedToken.role;
  }catch(error){
    return {message : error}
  }
  
}


const technicienAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, TOKEN_SECRET);
    const technicienId = decodedToken.technicienId;
    req.body.role = decodedToken.role;
    next();
    
  } catch (error) {
    res.status(401).json({ error: error | "Request not authentified" });
  }
};



const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, TOKEN_SECRET);
    const adminId = decodedToken.adminId;
    req.body.role = decodedToken.role;
    next()
    
  } catch (error) {
    res.status(401).json({ error: error | "Request not authentified" });
  }
};

exports.auth = (req, res, next) => {
  const role = getRole(req);
  if (role === "admin") {
    adminAuth(req, res, next);
  } else if (role === "technicien") {
    technicienAuth(req, res, next);
  } else {
    res.status(401).json({
      error: "Your token does't contain a role!"
    });
  }
};