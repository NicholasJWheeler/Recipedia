// Import the storage function for favoriting recipes from app.js
import { storeFavoritedRecipe } from "./app.js";
// Alex Code w Search
// Initialize DOM variables
let searchContainer = document.getElementById("search-container")
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", addText)


// Function to handle text entered into the recipe search box
// and executed when the "Search" button is clicked. This function
// calls the Spoonacular API with a specialized API key and entered
// ingredients and returns 1 top recipe to be displayed.
async function addText() {
    const apikey = "7f9327223f0443e69a8a6a66ec79a8d3"
    let rawInput = document.getElementById("search").value;
    let ingredients = document.getElementById("search").value.split(" ")
    let searchURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apikey}&ingredients=`;

    for (let i = 0; i < ingredients.length; i++) {
        searchURL += `${ingredients[i]},+`
    }

    searchURL = searchURL.substring(0, searchURL.length - 2)
    // Show one recipe
    searchURL += `&number=${1}`

    try {
        // Send formatted words to the API
        const response = await fetch(searchURL);
        const data = await response.json();
        let recipeString = ``
        for (let i = 0; i < data.length; i++) {
            let recipeURL = `https://api.spoonacular.com/recipes/${data[i].id}/information?apiKey=${apikey}&includeNutrition=false`
            const recipeResponse = await fetch(recipeURL)
            const recipeData = await recipeResponse.json()
            searchContainer.appendChild(takesRecipeDataGivesHTML(recipeData))
            recipeString += `${i + 1}. [${data[i].title}](${recipeData.sourceUrl})\n`
        }

    } catch (error) {
        console.log('Did not work')
    }
}

// This function will take the Json data that the API returns
// and format it into a viewable recipe that the user can click.
// Also displays a favorite button that will store the recipe for the user.
function takesRecipeDataGivesHTML(data) {
    let element = document.createElement("div")
    element.setAttribute("class", "row")
    element.setAttribute("style", "padding:10px")
    element.innerHTML =
      `<div class="col-3">
              <img src="${data.image}" style="width:100%" />
          </div>
          <div class="col-8">
              <a href="${data.spoonacularSourceUrl}"><h3>${data.title}</h3></a>
              <p>
                  ${data.summary}
              </p>
          </div>
          <div class="col-1">
          <button class="btn btn-warning favorite-btn">Favorite</button> 
        </div>
      `;
    
      const favoriteBtn = element.querySelector('.favorite-btn');
      favoriteBtn.addEventListener('click', () => {
        storeFavoritedRecipe(data);
      });
    
      return element;
}