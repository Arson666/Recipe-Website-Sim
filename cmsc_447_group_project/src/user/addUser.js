import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addUser.css';

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    type: '',
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

    fetch('http://localhost:3001/addUser', {
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
        navigate('/dashboard'); // Redirect to dashboard after adding user
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="add-user-container"> {/* Add the class name */}
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        <label htmlFor="type">Type</label>
        <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;