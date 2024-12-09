import './App.css';
import Dashboard from './dashboard/Dashboard';
import Homepage from './homepage/Homepage';
import Login from './login/Login';
import Registration from './registration/Registration';
import RecipeDetail from './dashboard/RecipeDetail';
import Logout from './logout_page/Logout';
import AddUser from './user/addUser';
import UpdateUser from './user/updateUser';
import DeleteUser from './user/deleteUser';
import RecipeView from './recipe/viewRecipe';
import AddRecipe from './recipe/addRecipe';
import UpdateRecipe from './recipe/updateRecipe';
import DeleteRecipe from './recipe/deleteRecipe';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Registration />}/>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="/home" element={<Homepage />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/updateUser" element={<UpdateUser />} />
        <Route path="/deleteUser" element={<DeleteUser />} />
        <Route path="/recipeview" element={<RecipeView />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/updateRecipe" element={<UpdateRecipe />} />
        <Route path="/deleteRecipe" element={<DeleteRecipe />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
