const apiKey = "b00233ffb7334c04a7aaf077f1dc9ad1"; // Replace with your API key (not used here)
const recipeContainer = document.getElementById("recipe-container");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

// Add event listener for the search button
searchButton.addEventListener("click", async () => {
    const query = searchBar.value.trim(); // Trim whitespace from input
    if (!query) return alert("Please enter a recipe name!");
    fetchRecipes(query);
});

// Fetch recipes from TheMealDB API
async function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching data:", error);
        recipeContainer.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    }
}

// Display fetched recipes in the recipe container
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
            <button onclick="window.open('${recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`}')">
                Know More
            </button>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}

// Optional: Add "Enter" key functionality for the search bar
searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});
