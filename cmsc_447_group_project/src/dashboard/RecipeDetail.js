import React from 'react';
import { useLocation } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const location = useLocation();
  const { recipe } = location.state;

  return (
    <div>
      <h2>{recipe.recipe_name}</h2>
      <p>Servings: {recipe.servings}</p>
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Rating: {recipe.rating}</p>
      <p>Nutrition: {recipe.nutrition}</p>
      <img src={recipe.img_src} alt={recipe.recipe_name} />
    </div>
  );
};

export default RecipeDetail;