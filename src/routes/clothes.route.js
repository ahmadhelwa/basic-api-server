"use strict";
const express = require("express");
const { Clothe } = require("../models/index");
const clothesRouter = express.Router();

// routes
clothesRouter.get("/clothe", getClothes);
clothesRouter.get("/clothe/:id", getOneClothe);
clothesRouter.post("/clothe", addClothe);
clothesRouter.put("/clothe/:id", updateClothe);
clothesRouter.delete("/clothe/:id", deleteClothe);

// select all

async function getClothes(req, res) {
  const clothes = await Clothe.findAll();
  res.status(200).json(clothes);
}

// get one clothe

async function getOneClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const clothe = await Clothe.findOne({ where: { id: clotheId } });
  res.status(200).json(clothe);
}

// add clothe
async function addClothe(req, res) {
  const newClothe = req.body;
  const clothe = await Clothe.create(newClothe);
  res.status(201).json(clothe);
}
// update clothe by id
async function updateClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const updateClothe = req.body;
  const foundClothe = await Clothe.findOne({ where: { id: clotheId } });
  if (foundClothe) {
    let updatedClothe = await foundClothe.update(updateClothe);
    res.status(201).json(updatedClothe);
  } else {
    res.status(404);
  }
}

// delete clothe by id
async function deleteClothe(req, res) {
  const clotheId = parseInt(req.params.id);
  const deleteClothe = await Clothe.findOne({ where: { id: clotheId } });

  res.status(204).json(deleteClothe);
}
module.exports = clothesRouter;
