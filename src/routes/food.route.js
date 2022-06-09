"use strict";

const express = require("express");

const { Food } = require("../models/index");

const foodRouter = express.Router();

// routes
foodRouter.get("/food", getFoods);
foodRouter.get("/food/:id", getOneFood);
foodRouter.post("/food", addFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);
// select all
async function getFoods(req, res) {
  const foods = await Food.findAll();
  res.status(200).json(foods);
}
// get one Food
async function getOneFood(req, res) {
  const foodId = parseInt(req.params.id);
  const food = await Food.findOne({ where: { id: foodId } });
  res.status(200).json(food);
}
// add Food
async function addFood(req, res) {
  const newFood = req.body;
  const food = await Food.create(newFood);
  res.status(201).json(food);
}
// update food by id
async function updateFood(req, res) {
  const foodId = parseInt(req.params.id);
  const updateFood = req.body;
  const foundFood = await Food.findOne({ where: { id: foodId } });
  if (foundFood) {
    const updatedFood = await foundFood.update(updateFood);
    res.status(201).json(updatedFood);
  } else {
    res.status(404);
  }
}
// delete food by id
async function deleteFood(req, res) {
  const foodId = parseInt(req.params.id);
  const deletefood = await Food.findOne({ where: { id: foodId } });

  res.status(204).json(deletefood);
}
module.exports = foodRouter;
