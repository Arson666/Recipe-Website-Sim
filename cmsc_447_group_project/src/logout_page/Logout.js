import React from 'react';
import './Logout.css';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const benefits = [
    "Find Amazing Recipes",
    "Browse Through Recipes",
    "Submit Your Own Recipes",
  ];

  const navigate = useNavigate();

  const [currentBenefitIndex, setCurrentBenefitIndex] = React.useState(0);

  const handleBenefitChange = () => {
    setCurrentBenefitIndex((prevIndex) => (prevIndex + 1) % benefits.length);
  };

  const handleLoginClick = () => { 
      navigate('/login');
  };

  const handleRegisterClick = () => { 
    navigate('/register');
  };

  const handleHomeClick = () => { 
    navigate('/home');
  };


  React.useEffect(() => {
    const intervalId = setInterval(handleBenefitChange, 3000);

    return () => clearInterval(intervalId);
  }, [benefits.length]);

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo-container">
        <a href="home" onClick={handleHomeClick}>
        <h1>Recipe App</h1>
        </a>
          <p>Sponsored by A-G Associates</p>
        </div>
        <nav className="nav">
          <a href="login" className="login" onClick={handleLoginClick}>Login</a>
        </nav>
      </header>
      <main className="main">
        <section className="benefits-container">
          <h2>Unlock Culinary Potential</h2>
          <div className="benefit-text">{benefits[currentBenefitIndex]}</div>
        </section>
        <section className="summary">
          <h3>You Have Successfully Logged Out</h3>
          <p>
          Logout complete. Feel free to return anytime to explore, save, and cook up a storm with our diverse range of mouth-watering recipes. Our platform is 
          your culinary companion, ready to inspire your next delicious creation. Happy cooking and see you soon!

          </p>
        </section>
        <section className="get-started">
          <button type="button" className="get-started-btn" onClick={handleHomeClick}>Return Home</button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Recipe App</p>
      </footer>
    </div>
  );
};

export default Logout;
