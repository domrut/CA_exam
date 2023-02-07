const recipesHtml = document.querySelector(".recipes");
const filterButton = document.querySelector(".filterButton");
const inputs = document.querySelectorAll("input");
let recipes = localStorage.getItem("recipes");

recipes = JSON.parse(recipes);

const addHtml = (data) => {
    recipesHtml.innerHTML += `        
        <div class="borderis recipe p20 d-flex f-direction f-wrap">
            <img class="m10 imageSizeAll" src=${data.image} alt="">
            <p>Title:<span>${data.title}</span></p>
            <p>Description:<span>${data.description}</span></p>
            <p>Ingredients:<span class="ingredient">${data.ingredients}</span></p>
            <p>Calories:<span>${data.calories}</span></p>
        </div>`
}

if (recipes !== null) {
    filterButton.disabled = false;
    recipes.forEach(el => addHtml(el))
} else {
    filterButton.disabled = true;
    alert("no recipes added");
}

filterButton.addEventListener("click", () => {
    let result = recipes;
    if (inputs[0].value) result = recipes.filter(el => el.title === inputs[0].value)
    if (inputs[1].value) result = result.filter(el => el.calories === inputs[1].value)
    if (inputs[2].value) result = result.filter(el => el.ingredients.includes(inputs[2].value))
    recipesHtml.innerHTML = "";
    result.forEach(el => addHtml(el));
})