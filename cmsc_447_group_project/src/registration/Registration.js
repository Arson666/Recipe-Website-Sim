import React, { useState } from 'react';
import './registration.css';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
    });

    const [error, setError] = useState(null); // State variable for error message

    const handleLoginClick = () => { 
        navigate('/login');
    };

    const handleHomeClick = () => { 
      navigate('/home');
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }));
      setError(null); // Clear the error message when user types
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log('Form Data:', formData);
    
      const formData2 = {
        the_username: formData.username,
        the_password: formData.password,
        user_type: "User"
      };
    
      fetch('http://localhost:3001/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData2)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { // Return the JSON data for further processing
            throw new Error(data.error || 'Username already exists');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Response:", data);
        navigate('/dashboard');
        setError(null); // Clear the error message on successful registration
        // Redirect or show success message
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Username already exists'); // Set the specific error message
      });
    };

    return (
      <div className="homepage-container">
        <header className="header">
          <div className="logo-container">
            <a href="home" onClick={handleHomeClick}>
              <h1>Recipe App</h1>
            </a>
            <p>Sponsored by A-G Associates</p>
          </div>
        </header>
        <main className="main">
          <section className="registration-form">
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirmpassword" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} required />
              <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>Already have an account? <a href="login" onClick={handleLoginClick}>Login</a></p>
          </section>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Recipe App</p>
        </footer>
      </div>
    );
};

export default Registration;


//value={formData.email} onChange={handleChange}
//value={formData.password1} onChange={handleChange}
//value={formData.password2} onChange={handleChange}
