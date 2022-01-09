const Admin = require("../models/Admin");
// const { TOKEN_SECRET } = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET="kjsfhsfhlsfh"
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const admin = new Admin({
        userName: req.body.userName,
        password: hash,
        
      });
      admin
        .save()
        .then(() =>
          res.status(201).json({
            message: "User created!",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

exports.login = (req, res, next) => {
  Admin.findOne({
    userName: req.body.userName,
  })
    .then((admin) => {
      if (!admin) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          console.log(valid)
          if (!valid) {
            return res.status(401).json({ error: "Worng password" });
          }
          res.status(200).json({
            admin: admin._id,
            token: jwt.sign(
              {
                admin: admin._id,
                role: "admin",
              },
              TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => {
          console.log("error 1")
          res.status(500).json({
            error,
          })
        }
          
        );
    })
    .catch((error) =>
    {
      console.log("error 2")
      res.status(500).json({
        error,
      })
    }
    );
};





