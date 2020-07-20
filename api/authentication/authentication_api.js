const express = require("express");
const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");

module.exports = function (apiParams) {
  const api = apiParams.api;

  api.post("/register", async (req, res) => {
    await User.findOne(
      {
        email: req.body.email,
      },
      async function (err, docs) {
        if (!err) {
          if (docs) {
            res.status(200).json({
              msg: "Account already exists",
              status: "0",
            });
          } else {
            try {
              const user = new User(req.body);
              bcrypt.hash(req.body.password, 10, async (err, hash) => {
                user.password = hash;
                await user.generateAuthToken();
                user.save((err) => {
                  if (err) {
                    res.status(400).json({
                      message: err,
                      status: "-1",
                    });
                  } else {
                    res.status(201).json({
                      token:user.token,
                      message: "Account Registered",
                      status: "1",
                    });
                  }
                });
              });
            } catch (error) {
              console.log(error);
              res.status(400).json({
                message: "An error occured",
                status: "0",
              });
            }
          }
        } else {
          res.status(400).json({
            msg: "An error  occured",
            status: "-1",
          });
        }
      }
    );
  });

  api.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      User.findOne(
        {
          email: username,
        },
        async (err, user) => {
          if (err) {
            res.status(400).json({
              status: "0",
              error: "Login Failed! Check details and try again",
            });
            return;
          }
         if(user){
            var isPasswordMatch = await user.authenticate(username, password);
          if (isPasswordMatch) {
            await user.generateAuthToken();
            res.json({
              status: "1",
              token: user.token,
              name: user.name,
            });
          } else {
            res.status(200).json({
              status: "0",
              error: "Login Failed! Check details and try again",
            });
          }
         }else{
           res.json({
             status:"0",
             message:"Invalid credentials"
           })
         }
        }
      );
    } catch (error) {
      res.status(400).json({
        status: "-1",
        message: error,
      });
    }
  });
};
