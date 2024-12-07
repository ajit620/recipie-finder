const recipeContainer = document.getElementById("recipe-container");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const themeToggle = document.getElementById("theme-toggle");

// Set default mode based on localStorage
const savedMode = localStorage.getItem("theme");
if (savedMode) {
    document.body.classList.add(savedMode);
}

themeToggle.addEventListener("click", () => {
    // Toggle between light and dark mode
    const currentMode = document.body.classList.contains("dark-mode") ? "dark-mode" : "light-mode";
    const newMode = currentMode === "dark-mode" ? "light-mode" : "dark-mode";

    document.body.classList.remove(currentMode);
    document.body.classList.add(newMode);

    // Save the current mode to localStorage
    localStorage.setItem("theme", newMode);

    // Toggle the button icon based on the mode
    themeToggle.innerHTML = newMode === "dark-mode" ? "🌙" : "🌞";
});

searchButton.addEventListener("click", () => {
    const query = searchBar.value.trim();
    if (!query) {
        alert("Please enter a recipe name!");
        return;
    }
    fetchRecipes(query);
});

async function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = `<p class="placeholder">⚠️ Something went wrong. Please try again later!</p>`;
    }
}

function displayRecipes(recipes) {
    recipeContainer.innerHTML = "";
    if (!recipes) {
        recipeContainer.innerHTML = `<p class="placeholder">❌ No recipes found. Try a different search!</p>`;
        return;
    }

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.className = "recipe-card";
        recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <button onclick="window.open('${recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`}')">View Recipe</button>
        `;
        recipeContainer.appendChild(recipeCard);
    });
}
