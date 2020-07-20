const express = require("express");
const Recipe = require('../../models/recipeSchena')
const Cuisine = require('../../models/cuisineSchema')
const Comment = require("../../models/commentSchema")
const Note = require("../../models/notesSchema")
const Favourite = require("../../models/favouritesSchema")

module.exports = function (apiParams) {
  const api = apiParams.api;

  
  api.post("/comment/add",async (req,res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: "1",
            message: "comment added",
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

  api.post("/notes/find" , async (req,res) =>{
    Note.find({user_id:req.body.user_id }, (err,notes) =>{
      if(err){
        console.log(err);
        res.json({
          status:"-1",
          message:"An error occured"
        })
      }else{
        if(notes && notes.length > 0){
          res.json({
            status:"1",
            message:notes
          })
        }else{
          res.json({
            status:"0",
            message:"no notes"
          })
        }
      }
    })
  })

  api.post("/notes/add",async (req,res) => {
    try {
      const note = new Note(req.body);
      await note.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: "1",
            message: "note added",
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

  api.post("/favourite/add",async (req,res) => {
    try {
      const favourite = new Favourite(req.body);
      await favourite.save((err) => {
        if (err) {
          console.log(err);
          res.json({
            status: "-1",
            message: "An error occured",
          });
        } else {
          Recipe.findById(req.body.recipe._id,async (err,reci) =>{
            if(!err){
              if(reci){
                reci.favCount=reci.favCount+1
                await reci.save()
              }
              res.json({
                status: "1",
                message: "favourite added",
              });
            }else{
              console.log(err);
              res.json({
                status: "-1",
                message: "An error occured",
              });
            }
          })
          
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

  api.post("/favourite/all",async (req,res) => {
    Favourite.find({user_id:req.body.user_id} , (err,result) =>{
      if(err){
        console.log(error);
        res.json({
          status: "-1",
          message: "An error occured",
        });
      }else{
        if(result && result.length >0 ){
          res.json({
            status: "1",
            message: result,
          });
        }else{
          res.json({
            status: "0",
            message: "no favs",
          });
        }
      }
    })
  })

};
