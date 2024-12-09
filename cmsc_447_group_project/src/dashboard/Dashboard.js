import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import axios from 'axios';
import RecipeDetail from './RecipeDetail';

const Dashboard = () => {
  const navigate = useNavigate();
  //const elasticsearch = [];
  const [activeSection, setActiveSection] = useState('search'); // Set initial state to 'search'
  const [recipes, setRecipes] = useState([]);
  const [searchText,setSearchText] = useState(''); // State to store search term
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [ noData , setNoData]  = useState(true)
  const isGuestFromStorage = localStorage.getItem('isGuest') === 'true';
 
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleHomeClick = () => { 
    navigate('/home');
  };

  const handleSearch = async () => {
    if (searchText) {
      try {
        const encodedText = encodeURIComponent(searchText);
        console.log('ENCODED TEXT', encodedText);
        const url = `http://localhost:3001/queryRecipes?searchTerm=${encodedText}`;
        const response = await fetch(url, {
          method: 'GET'
        });
        

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('RESPONSE DATA', data);
        setRecipes(data);  // Update the recipes state with the fetched data
        if(data.length == 0 ){
          setNoData(true )
          setFilteredRecipes([])
          return
        }
        console.log(JSON.stringify(data[0]))
        const r =  data.filter(recipe => recipe.recipe_name.toLowerCase().includes(searchText.toLowerCase())); // Filter recipes based on search term
        setFilteredRecipes([...r])
        setNoData(false )

      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    }
};

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <a href="home" onClick={handleHomeClick}>
          <h1>Recipe App</h1>
          </a>
          {!isGuestFromStorage && <button onClick={() => navigate('/logout')}>Logout</button>}
        </div>

      </header>
      <div className="dashboard-wrapper">
        <nav className="dashboard-nav">
          <button
            className={activeSection === 'search' ? 'active' : ''}
            onClick={() => setActiveSection('search')}
          >
            Search
          </button>
          <button
            className={activeSection === 'view' ? 'active' : ''}
            onClick={() => setActiveSection('view')}
          >
            View Recipes

          </button>
          <button
            onClick={() => navigate('/addRecipe')}
          >
            add Recipes

          </button>
          <button
            onClick={() => navigate('/updateRecipe')}
          >
            update Recipes

          </button>
          <button
            onClick={() => navigate('/deleteRecipe')}
          >
            delete Recipes

            </button>
          <button
            onClick={() => navigate('/addUser')}
          >
            add User

          </button>
          <button
            onClick={() => navigate('/updateUser')}
          >
            update User

          </button>
          <button
            onClick={() => navigate('/deleteUser')}
          >
            delete User
          </button>
        </nav>
        <div className="dashboard-content">
          {activeSection === 'search' && (
            <div className="search-section">
              <h3>Search Recipes</h3>
              <input type="text" value={searchText} onChange={handleSearchChange} placeholder="Search by recipe name" />
              <button onClick={handleSearch}>Search</button>
              {recipes.length === 0 ? (
                <p>No recipes found for your search.</p>
              ) : (
                <ul className="recipe-list">
                  {!noData && filteredRecipes.map((recipe, index) => (
                    <RecipeListItem
                      key={index}
                      recipe={recipe}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeSection === 'view' && (
            <div className="view-section">
              <h3>Your Recipes</h3>
              {recipes.length === 0 ? (
                <p>You haven't added any recipes yet!</p>
              ) : (
                <ul className="recipe-list">
                  {recipes.map((recipe, index) => (
                    <RecipeListItem
                      key={index}
                      recipe={recipe}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const RecipeForm = ({ onAddRecipe }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRecipe = {
      // Get recipe data from form fields (name, ingredients, instructions, etc.)
    };
    onAddRecipe(newRecipe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Add Recipe</button>
    </form>
  );
};

const RecipeListItem = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.index}`, { state: { recipe } });
  };

  return (
    <li>
      <button onClick={handleClick}>
        <h4>{recipe.recipe_name}</h4>
        <p>{recipe.ingredients}</p>
      </button>
    </li>
  );
};

export default Dashboard;