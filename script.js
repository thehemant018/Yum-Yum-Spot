const searchBtn = document.getElementById('search-btn');
const foodList = document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodRecipe);
recipeCloseBtn.addEventListener('click', () => {
    foodDetailsContent.parentElement.classList.remove('showRecipe');
});



function getFoodList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "food-item" data-id = "${meal.idMeal}">
                        <div class = "food-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "food-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            foodList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            foodList.classList.add('notFound');
        }

        foodList.innerHTML = html;
    });
}


function getFoodRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodRecipeModal(data.meals));
    }
}

function foodRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-food-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <button class="Yt-btn"><a href = "${meal.strYoutube}" target = "_blank">Watch Video</a></button>
            
        </div>
    `;
    foodDetailsContent.innerHTML = html;
    foodDetailsContent.parentElement.classList.add('showRecipe');
}

