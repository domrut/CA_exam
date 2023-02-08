const inputs = document.querySelectorAll("input");
const getPhoto = document.querySelector(".getPhoto");
const addToRecipes = document.querySelector(".addToRecipes");
const recipeImage = document.querySelector(".imageSize");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const ingredients = document.querySelector(".ingredients");
const calories = document.querySelector("#calories");
const addIngredient = document.querySelector(".addIngredient");

const recipe = {
    title: "",
    description: "",
    image: "",
    ingredients: [],
    calories: ""
};

let recipes = JSON.parse(localStorage.getItem("recipes")) !== null ? JSON.parse(localStorage.getItem("recipes")) : [];
const fetchPhoto = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            recipeImage.style.display = "flex";
            recipeImage.src = recipe.image = data.meals[0].strMealThumb
        })
        .catch(err => console.log(err))
}

getPhoto.addEventListener("click", () => {
    fetchPhoto();
})

inputs.forEach(el => {
    el.addEventListener("change", (event) => {
        if (title.id === event.composedPath()[0].attributes[1].value) {
            title.innerText = recipe.title = el.value;
        } else if (description.id === event.composedPath()[0].attributes[1].value) {
            description.innerText = recipe.description = el.value;
        } else if (calories.id === event.composedPath()[0].attributes[1].value) {
            calories.innerText = recipe.calories = el.value;
        } else {
            return;
        }
    })
})

addIngredient.addEventListener("click", () => {
    if(inputs[1].value) {
        recipe.ingredients.push(inputs[1].value);
        ingredients.innerHTML += `<span class="ingredient">${inputs[1].value}</span>`
    }
    inputs[1].value = "";
})

addToRecipes.addEventListener("click", () => {
    if (recipe.ingredients.length >= 3) {
        for (let key in recipe) {
            if (recipe[key] === "") {
                alert(`some fields are empty, please enter the data`);
                return;
            }
        }
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes))
    } else {
        alert("not enough ingredients, min 3 needed")
    }
})

