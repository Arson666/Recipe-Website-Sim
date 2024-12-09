import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './updateRecipe.css'; 

const UpdateRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FindIdxA: '',
    newRespNameA: '',
    newRatingA: '',
    newIngredientsA: '',
    newServingsA: '',
    newNutritionA: '',
    newTimingA: '',
    newDirectionsA: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/updateRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Response:", data);
        navigate('/dashboard'); // Redirect to dashboard after update
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="update-recipe-container">
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="FindIdxA">Recipe Index</label>
        <input type="text" id="FindIdxA" name="FindIdxA" value={formData.FindIdxA} onChange={handleChange} required />
        <label htmlFor="newRespNameA">New Recipe Name</label>
        <input type="text" id="newRespNameA" name="newRespNameA" value={formData.newRespNameA} onChange={handleChange} required />
        <label htmlFor="newRatingA">New Rating</label>
        <input type="text" id="newRatingA" name="newRatingA" value={formData.newRatingA} onChange={handleChange} required />
        <label htmlFor="newIngredientsA">New Ingredients</label>
        <input type="text" id="newIngredientsA" name="newIngredientsA" value={formData.newIngredientsA} onChange={handleChange} required />
        <label htmlFor="newServingsA">New Servings</label>
        <input type="text" id="newServingsA" name="newServingsA" value={formData.newServingsA} onChange={handleChange} required />
        <label htmlFor="newNutritionA">New Nutrition</label>
        <input type="text" id="newNutritionA" name="newNutritionA" value={formData.newNutritionA} onChange={handleChange} required />
        <label htmlFor="newTimingA">New Timing</label>
        <input type="text" id="newTimingA" name="newTimingA" value={formData.newTimingA} onChange={handleChange} required />
        <label htmlFor="newDirectionsA">New Directions</label>
        <input type="text" id="newDirectionsA" name="newDirectionsA" value={formData.newDirectionsA} onChange={handleChange} required />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;