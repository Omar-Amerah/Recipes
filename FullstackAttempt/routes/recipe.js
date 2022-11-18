const { Router } = require('express');
const recipeRouter = Router();

const { Recipe }= ("../models/recipe.model.js")



recipeRouter.post("/add", async (req, res) => {
    try{
        const test = await Recipe.create("Hello 5");
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