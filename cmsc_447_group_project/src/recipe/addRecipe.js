import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addRecipe.css'; 

const AddRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    respNameA: '',
    ratingA: '',
    ingredientsA: '',
    servingsA: '',
    nutritionA: '',
    timingA: '',
    directionsA: '',
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

    fetch('http://localhost:3001/addRecipe', {
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
        navigate('/dashboard'); // Redirect to dashboard after adding recipe
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="respNameA">Recipe Name</label>
        <input type="text" id="respNameA" name="respNameA" value={formData.respNameA} onChange={handleChange} required />
        <label htmlFor="ratingA">Rating</label>
        <input type="text" id="ratingA" name="ratingA" value={formData.ratingA} onChange={handleChange} required />
        <label htmlFor="ingredientsA">Ingredients</label>
        <input type="text" id="ingredientsA" name="ingredientsA" value={formData.ingredientsA} onChange={handleChange} required />
        <label htmlFor="servingsA">Servings</label>
        <input type="text" id="servingsA" name="servingsA" value={formData.servingsA} onChange={handleChange} required />
        <label htmlFor="nutritionA">Nutrition</label>
        <input type="text" id="nutritionA" name="nutritionA" value={formData.nutritionA} onChange={handleChange} required />
        <label htmlFor="timingA">Timing</label>
        <input type="text" id="timingA" name="timingA" value={formData.timingA} onChange={handleChange} required />
        <label htmlFor="directionsA">Directions</label>
        <input type="text" id="directionsA" name="directionsA" value={formData.directionsA} onChange={handleChange} required />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;