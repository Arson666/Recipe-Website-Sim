import React, { useState, useEffect } from 'react';
import './viewRecipe.css'; // Import your CSS file for styling

const RecipeView = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch('http://localhost:3001/recipeview')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Recipes:", data);
        setRecipes(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="recipe-view-container">
      <h2>Recipe View</h2>
      <div className="recipes">
        {recipes.map(recipe => (
          <div key={recipe.index} className="recipe">
            <h3>{recipe.recipe_name}</h3>
            <p><strong>Rating:</strong> {recipe.rating}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Nutrition:</strong> {recipe.nutrition}</p>
            <p><strong>Timing:</strong> {recipe.timing}</p>
            <p><strong>Directions:</strong> {recipe.directions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeView;