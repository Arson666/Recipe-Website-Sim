import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './deleteRecipe.css'; 

const DeleteRecipe = () => {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    delete_RecipeA: '',
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

    fetch('http://localhost:3001/deleteRecipe', {
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
        navigate('/dashboard'); // Redirect to dashboard after delete
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="delete-recipe-container">
      <h2>Delete Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="delete_RecipeA">Recipe Index to Delete</label>
        <input type="text" id="delete_RecipeA" name="delete_RecipeA" value={formData.delete_RecipeA} onChange={handleChange} required />
        <button type="submit">Delete Recipe</button>
      </form>
    </div>
  );
};

export default DeleteRecipe;