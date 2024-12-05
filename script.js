const apiKey = " b00233ffb7334c04a7aaf077f1dc9ad1"; // Replace with your API key
const recipeContainer = document.getElementById("recipe-container");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

searchButton.addEventListener("click", async () => {
    const query = searchBar.value;
    if (!query) return alert("Please enter a recipe name!");
    fetchRecipes(query);
});

async function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayRecipes(recipes) {
    recipeContainer.innerHTML = ""; // Clear previous results
    if (!recipes) {
        recipeContainer.innerHTML = "<p>No recipes found!</p>";
        return;
    }
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <button onclick="window.open('${recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`}')">Know More</button>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}
