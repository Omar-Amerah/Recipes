const { Router } = require('express');
const recipeRouter = Router();

const { Recipe } = require("../models/recipe.model.js")



recipeRouter.post("/add", async (req, res) => {
    try{
        const test = await Recipe.create(finalnutrition);
        res.send(test)
    }
    catch(error){
        res.send(error)
    }
})
 
// recipeRouter.get("/send", async (req, res) => {
//     try{
//         const data = await Recipe.findAll()
//         res.send(data)
//     }catch(error){
//         res.send(error)
//     }
// })

module.exports = recipeRouter;