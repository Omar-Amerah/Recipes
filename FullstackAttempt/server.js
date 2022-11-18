const express = require('express');
const app = express();
const cors = require("cors")
const recipeRouter = require("./routes/recipe.js")

const db = require("./db/db.js")
app.use(cors())
app.use(express.json());
app.use("/recipe", recipeRouter);

app.listen(5001, async () => {
    await db.sync();
    console.log("server started")
})