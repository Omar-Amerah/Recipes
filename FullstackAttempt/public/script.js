const ingredients = []
const finalnutrition = {}
const main = document.querySelector("main")
const search = document.querySelector("#Search")
const submitbtn = document.querySelector("button")
const sendbutton = document.getElementById("Send")
const sendsearch = document.getElementById("Recipesearch")
let value = ""
let recname = "Empty"
async function getfood(input) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd75699b971msh804998c14ab454ep1fafc6jsn92b5b5826652',
      'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com'
    }
  };
  const response = await fetch(`https://calorieninjas.p.rapidapi.com/v1/nutrition?query=${input}`, options)
  const data = await response.json();
  if(data.items.length === 0)
  {
    alert("Not a valid input")
  }else
  {
    createcards(data)
  }
  
} 

const cardsection = document.createElement("section")
cardsection.classList.add("cardsection")


function createcards(data){
  let temparray = []
  const card = document.createElement('div')
  card.classList.add("cardarea")

  const name = document.createElement('h1')
  name.classList.add("name")
  name.innerHTML = data.items[0].name.charAt(0).toUpperCase() + data.items[0].name.slice(1);
  temparray.push (data.items[0].name.charAt(0).toUpperCase() + data.items[0].name.slice(1));

  const calories = document.createElement('p')
  calories.classList.add("cal")
  calories.classList.add("cardtext")
  calories.innerHTML = "Calories: " + data.items[0].calories 
  temparray.push(data.items[0].calories)

  const carbohydrates = document.createElement('p')
  carbohydrates.classList.add("carb")
  carbohydrates.classList.add("cardtext")
  carbohydrates.innerHTML = "Carbohydrates: " + data.items[0].carbohydrates_total_g 
  temparray.push(data.items[0].carbohydrates_total_g )

  const fat = document.createElement('p')
  fat.classList.add("cal")
  fat.classList.add("cardtext")
  fat.innerHTML = "Fat: " + data.items[0].fat_total_g 
  temparray.push(data.items[0].fat_total_g )

  const protein = document.createElement('p')
  protein.classList.add("cal")
  protein.classList.add("cardtext")
  protein.innerHTML = "Protein: " + data.items[0].protein_g 
  temparray.push(data.items[0].protein_g )

  const sodium = document.createElement('p')
  sodium.classList.add("cal")
  sodium.classList.add("cardtext")
  sodium.innerHTML = "Sodium: " + data.items[0].sodium_mg  + "mg"
  temparray.push(data.items[0].sodium_mg)

  const sugar = document.createElement('p')
  sugar.classList.add("cal")
  sugar.classList.add("cardtext")
  sugar.innerHTML = "Sugar: " + data.items[0].sugar_g + "g"
  temparray.push(data.items[0].sugar_g)

  ingredients.push(temparray)
  updatenutritionalinformation()
  


  const weight = document.createElement('input')
  weight.type = "number"
  weight.placeholder = ("Change Weight")
  weight.classList.add("Updatesearch")
  let updateval;
  weight.addEventListener("input", e => {
    updateval = e.target.value
  })

  const updatebtn = document.createElement('button')
  updatebtn.innerHTML = "Update"
  updatebtn.classList.add("Updatebtn")

  updatebtn.addEventListener("click", () => {
    if(updateval !== undefined && updateval > 0){
      calories.innerHTML = "Calories: " + data.items[0].calories * updateval/100 + "cal"
      carbohydrates.innerHTML = "Carbohydrates: " + data.items[0].carbohydrates_total_g * updateval/100 + "g" 
      fat.innerHTML = "Fat: " + data.items[0].fat_total_g * updateval/100 + "g"
      protein.innerHTML = "Protein: " + data.items[0].protein_g * updateval/100 + "g" 
      sodium.innerHTML = "Sodium: " + data.items[0].sodium_mg * updateval/100  + "mg"
      sugar.innerHTML = "Sugar: " + data.items[0].sugar_g * updateval/100 + "g"
      const arraypos = ingredients.indexOf(temparray)
      temparray = [data.items[0].name,data.items[0].calories * updateval/100, data.items[0].carbohydrates_total_g * updateval/100,data.items[0].fat_total_g * updateval/100,data.items[0].protein_g * updateval/100,data.items[0].sodium_mg * updateval/100,data.items[0].sugar_g * updateval/100]
      ingredients.splice(arraypos, 1, temparray)
      updatenutritionalinformation()
    }
  })

  const removebtn = document.createElement('button')
  removebtn.innerHTML = "X"
  removebtn.classList.add("Removebtn")

  removebtn.addEventListener("click", () => {
    ingredients.splice(ingredients.indexOf(temparray), 1)
    card.remove()
  })


  //addingredient(data.items[0].name.charAt(0).toUpperCase() + data.items[0].name.slice(1), data.items[0].carbohydrates_total_g)

  card.append(name, calories, carbohydrates, fat, protein, sodium, sugar, weight, updatebtn, removebtn)
  cardsection.append(card)
  main.append(cardsection)
}

search.addEventListener("input", e => {
  value = e.target.value
})

submitbtn.addEventListener("click", () => {
  getfood(value)
})

sendbutton.addEventListener("click", async () => {
  if(recname !== "Empty" && recname !== "" && ingredients.length !== 0)
  {
    const data = await fetch("http://localhost:5001/recipe/add", {method: "POST", headers: {'Content-Type': 'application/json'},body: JSON.stringify(finalnutrition)});
    const response = await data.json()
    console.log(response)
  }
  else if (ingredients.length !== 0)
  {
    alert("Name cannot be empty!")    
  }
  else{
    alert("Must contain Ingredients")
  }
})

function updatenutritionalinformation() {
  for(let i = 0; i < ingredients.length; i++)
  {
    if(finalnutrition.calories === undefined)
    {
      finalnutrition.name = "No Name"
      finalnutrition.calories = ingredients[i][1] 
      finalnutrition.carbohydrates = ingredients[i][2]
      finalnutrition.Fat = ingredients[i][3]
      finalnutrition.Protein = ingredients[i][4]
      finalnutrition.Sodium = ingredients[i][5]
      finalnutrition.Sugar = ingredients[i][6]
    }
    else{
      finalnutrition.calories = finalnutrition.calories + ingredients[i][1] * 1
      finalnutrition.carbohydrates = finalnutrition.carbohydrates + ingredients[i][2]
      finalnutrition.Fat = finalnutrition.Fat + ingredients[i][3]
      finalnutrition.Protein = finalnutrition.Protein + ingredients[i][4]
      finalnutrition.Sodium = finalnutrition.Sodium + ingredients[i][5]
      finalnutrition.Sugar = finalnutrition.Sugar + ingredients[i][6]
    }
  }
}

sendsearch.addEventListener("input", e => {
  recname = e.target.value
  finalnutrition.name = recname
})
