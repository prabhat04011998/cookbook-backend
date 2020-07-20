const express = require("express");
const Recipe = require('../../models/recipeSchena')
const Cuisine = require('../../models/cuisineSchema')
const Comment = require("../../models/commentSchema")
const User= require("../../models/userSchema")

module.exports = function (apiParams) {
  const api = apiParams.api;

  api.get("/recipe/all", async (req,res) =>{
      Recipe.find({},(err,recipes) =>{
          if(err){
            console.log(err);
            res.json({
                status:"-1",
                message:"an error occured"
            })
          }else{
            if(recipes && recipes.length >0){
                res.json({
                    status:"1",
                    message:recipes
                })
            }else{
                res.json({
                    status:"0",
                    message:"no recipes"
                })
            }
          }
      })
  })

  api.post("/recipe/cuisine", async (req,res) =>{
      Recipe.find({cuisine_id:req.body.cuisine_id},(err,recipes) =>{
          if(err){
            console.log(err);
            res.json({
                status:"-1",
                message:"an error occured"
            })
          }else{
            if(recipes && recipes.length >0){
                res.json({
                    status:"1",
                    message:recipes
                })
            }else{
                res.json({
                    status:"0",
                    message:"no recipes"
                })
            }
          }
      })
  })

  api.post("/recipe/add", async (req,res) =>{
    try {
      const recipe = new Recipe(req.body);
      await recipe.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: "1",
            message: "recipe added",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "-1",
        message: "An error occured",
      });
    }
  })

  api.post("/recipe/findOne", async (req,res) =>{
    Recipe.findOne({_id:req.body.recipe_id},(err,recipe) =>{
        if(err){
          console.log(err);
          res.json({
              status:"-1",
              message:"an error occured"
          })
        }else{
          if(recipe){
              res.json({
                  status:"1",
                  message:recipe
              })
          }else{
              res.json({
                  status:"0",
                  message:"not found"
              })
          }
        }
    })
})

api.post("/user/findOne", async (req,res) =>{
  User.findById(req.body.user_id,(err,user) =>{
      if(err){
        console.log(err);
        res.json({
            status:"-1",
            message:"an error occured"
        })
      }else{
        if(user){
            res.json({
                status:"1",
                message:user
            })
        }else{
            res.json({
                status:"0",
                message:"not found"
            })
        }
      }
  })
})

api.post("/recipe/search", async (req,res) =>{
  Recipe.find({},(err,recipes) =>{
    if(err){
      console.log(err);
      res.json({
          status:"-1",
          message:"an error occured"
      })
    }else{
      if(recipes && recipes.length >0){
        const arr=[]
          recipes.forEach((rec) => {
            if(rec.name.search(req.body.word) >=0){
                arr.push(rec)
            }
          })
          if(arr.length >0){
            res.json({
              status:"1",
              message:arr
            })
          }else{
            res.json({
              status:"0",
              message:"no results"
            })
          }
      }else{
          res.json({
              status:"0",
              message:"no recipes"
          })
      }
    }
})
})


  api.get("/cuisine/all", async (req,res) =>{
    Cuisine.find({},(err,cuisines) =>{
        if(err){
          console.log(err);
          res.json({
              status:"-1",
              message:"an error occured"
          })
        }else{
          if(cuisines && cuisines.length >0){
              res.json({
                  status:"1",
                  message:cuisines
              })
          }else{
              res.json({
                  status:"0",
                  message:"no cuisines"
              })
          }
        }
    })
})

api.post("/cuisine/add", async (req,res) =>{
    try {
        const cuisine = new Cuisine(req.body);
        await cuisine.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              status: "1",
              message: "cuisine added",
            });
          }
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: "-1",
          message: "An error occured",
        });
      }
})

api.post("/cuisine/findByrecipe", async (req,res) =>{
    Recipe.findOne({_id:req.body.recipe_id},(err,recipe) =>{
        if(err){
          console.log(err);
          res.json({
              status:"-1",
              message:"an error occured"
          })
        }else{
          if(recipe){
            Cuisine.findOne({_id:recipe.cuisine_id},(err,cuisine) =>{
                if(err){
                  console.log(err);
                  res.json({
                      status:"-1",
                      message:"an error occured"
                  })
                }else{
                  if(cuisine){
                      res.json({
                          status:"1",
                          message:cuisine
                      })
                  }else{
                      res.json({
                          status:"0",
                          message:"not found"
                      })
                  }
                }
            })
          }else{
              res.json({
                  status:"0",
                  message:"not found"
              })
          }
        }
    })
})


api.post("/cuisine/findByrecipe", async (req,res) =>{
  Recipe.findOne({_id:req.body.recipe_id},(err,recipe) =>{
      if(err){
        console.log(err);
        res.json({
            status:"-1",
            message:"an error occured"
        })
      }else{
        if(recipe){
          Cuisine.findOne({_id:recipe.cuisine_id},(err,cuisine) =>{
              if(err){
                console.log(err);
                res.json({
                    status:"-1",
                    message:"an error occured"
                })
              }else{
                if(cuisine){
                    res.json({
                        status:"1",
                        message:cuisine
                    })
                }else{
                    res.json({
                        status:"0",
                        message:"not found"
                    })
                }
              }
          })
        }else{
            res.json({
                status:"0",
                message:"not found"
            })
        }
      }
  })
})

api.post("/cuisine/findOne", async (req,res) =>{
    Cuisine.findOne({_id:req.body.cuisine_id},(err,cuisine) =>{
        if(err){
          console.log(err);
          res.json({
              status:"-1",
              message:"an error occured"
          })
        }else{
          if(cuisine){
              res.json({
                  status:"1",
                  message:cuisine
              })
          }else{
              res.json({
                  status:"0",
                  message:"not found"
              })
          }
        }
    })
})

api.post("/comment/find", async (req,res) =>{
    Comment.find({recipe_id:req.body.recipe_id},(err,comments) =>{
        if(err){
          console.log(err);
          res.json({
              status:"-1",
              message:"an error occured"
          })
        }else{
          if(comments && comments.length >0){
              res.json({
                  status:"1",
                  message:comments
              })
          }else{
              res.json({
                  status:"0",
                  message:"no comments"
              })
          }
        }
    })
})
  
};
