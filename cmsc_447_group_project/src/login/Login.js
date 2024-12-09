import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State variable for error message

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError(null); // Clear the error message when user types
    };
      
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError(null); // Clear the error message when user types
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };

    const handleHomeClick = () => {
      navigate('/home');
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      console.log('Username:', username);
      console.log('Password:', password);

      const formData2 = {
        the_username: username,
        the_password: password
      };
    
      fetch('http://localhost:3001/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData2)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { // Return the JSON data for further processing
            throw new Error(data.error || 'Invalid username or password');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("Response:", data);
        setError(null); // Clear the error message on successful login
        navigate('/dashboard'); // Redirect on successful login
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Either your username or password is incorrect'); // Set the specific error message
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
            <section className="login-form">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required onChange={handleUsernameChange} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required onChange={handlePasswordChange} />
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                <p>Don't have an account? <a onClick={handleSignUpClick} href="register">Sign Up</a></p>
            </section>
        </main>
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Recipe App</p>
        </footer>
    </div>
  );
};

export default Login;
