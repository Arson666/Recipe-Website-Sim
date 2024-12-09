import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './deleteUser.css';

const DeleteUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    delete_user: '',
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

    fetch('http://localhost:3001/deleteUser', {
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
        navigate('/dashboard'); // Redirect to dashboard after deletion
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="delete-user-container"> {/* Add the class name */}
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="delete_user">Username to Delete</label>
        <input type="text" id="delete_user" name="delete_user" value={formData.delete_user} onChange={handleChange} required />
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};

export default DeleteUser;