import React from 'react';
import './SearchResults.css';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] };

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {recipes.length ? recipes.map((recipe, index) => (
          <li key={index}>{recipe.name} - {recipe.description}</li>
        )) : <li>No recipes found.</li>}
      </ul>
    </div>
  );
};

export default SearchResults;