const { Router } = require('express');
const recipeRouter = Router();

const { Recipe } = require("../models/recipe.model.js")



recipeRouter.post("/add", async (req, res) => {
    try{
        await Recipe.create({name:"Food", calories: 1, carbohydrates: 2, fat: 2, protein: 2, sodium: 2, sugar: 3});
        res.send("test")
    }
    catch(error){
        res.send("error")
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