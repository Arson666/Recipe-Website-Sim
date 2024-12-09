import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './updateUser.css'; 

const UpdateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldUsername: '',
    newUsername: '',
    newPassword: '',
    newType: '',
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

    fetch('http://localhost:3001/updateUser', {
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
    <div className="update-user-container"> {/* Add the class name */}
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oldUsername">Old Username</label>
        <input type="text" id="oldUsername" name="oldUsername" value={formData.oldUsername} onChange={handleChange} required />
        <label htmlFor="newUsername">New Username</label>
        <input type="text" id="newUsername" name="newUsername" value={formData.newUsername} onChange={handleChange} required />
        <label htmlFor="newPassword">New Password</label>
        <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
        <label htmlFor="newType">New Type</label>
        <input type="text" id="newType" name="newType" value={formData.newType} onChange={handleChange} required />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;