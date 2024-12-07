const recipeContainer = document.getElementById("recipe-container");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

// Search Button Click Handler
searchButton.addEventListener("click", async () => {
    const query = searchBar.value.trim();
    if (!query) return alert("Please enter a recipe name!");
    fetchRecipes(query);
});

// Fetch Recipes from API
async function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching data:", error);
        recipeContainer.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    }
}

// Display Recipes
function displayRecipes(recipes) {
    recipeContainer.innerHTML = "";
    if (!recipes) {
        recipeContainer.innerHTML = "<p>No recipes found! Try another search.</p>";
        return;
    }
    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <button onclick="window.open('${recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`}')">
                View Recipe
            </button>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Allow "Enter" Key for Search
searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

