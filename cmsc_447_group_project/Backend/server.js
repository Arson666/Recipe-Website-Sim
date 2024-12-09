const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const elasticsearch= require('elasticsearch');
const app = express();
app.use(cors());
app.use(express.json());

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error',
    apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

/**
client.ping({
    requestTimeout: 3000,
  }, function (error) {
    if (error) {
      console.error('Elasticsearch cluster is down!');
    } else {
      console.log('Elasticsearch is connected successfully.');
    }
});
**/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Specify the file path for the SQLite database
const dbPath = 'C:/Users/annai/cmsc447group6-branch2/cmsc447group6-branch2/cmsc_447_group_project/Backend/user.db'; // Update with your file path


// Attempt to connect to the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database successfully');
    }
});

const dbPathRecipe = 'C:/Users/annai/cmsc447group6-branch2/cmsc447group6-branch2/cmsc_447_group_project/Backend/recipe.db'; // Update with your file path

// Attempt to connect to the SQLite database
const db2 = new sqlite3.Database(dbPathRecipe, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database successfully');
    }
});


// Create tables in SQLite
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS user_data (
        username TEXT PRIMARY KEY,
        password TEXT,
        type TEXT
    )`);
});


app.get('/', (req, res) => {
    return res.json("From backend side");
});

// Shows all users
app.get('/allusers', (req, res) => {
        const selectSql = 'SELECT * FROM user_data';
        db.all(selectSql, (selectErr, data) => {
            if (selectErr) {
                console.error('Error fetching users:', selectErr);
                return res.status(500).json({ error: 'Error fetching users from database' });
            }
            return res.json(data);
        });
});

// Insert a new user
app.post('/addUser', (req, res) => {
    console.log("Function was called");

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body is missing or empty' });
    }
    const { username, password, type } = req.body;
    const userExistsSql = "SELECT * FROM user_data WHERE username = ?";
    db.get(userExistsSql, [username], (err, row) => {
        if (row) {
            return res.status(400).json({ error: 'Username already exists. Please provide a unique username.' });
        }
        const insertSql = "INSERT INTO user_data (username, password, type) VALUES (?, ?, ?)";
        db.run(insertSql, [username, password, type], function(err) {
            if (err) {
                console.error("Error adding user:", err);
                return res.status(500).json({ error: 'Error adding user to database' });
            }
            return res.status(201).json({ message: "User added successfully", id: this.lastID });
        });
    });
});

// Update user
app.get('/viewRecipe', (req, res) => {
    const selectSql = 'SELECT * FROM recipe_view';
    db2.all(selectSql, (err, data) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ error: 'Error fetching recipes from database' });
        }
        return res.json(data);
    });
});

// Delete user
app.post('/deleteUser', (req, res) => {
    const { delete_user } = req.body;
    const deleteSql = "DELETE FROM user_data WHERE username = ?";
    db.run(deleteSql, [delete_user], function(err) {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user from database' });
        }
        return res.redirect('/allusers');
    });
});

app.get('/viewRecipe', (req, res) => {
    const selectSql = 'SELECT * FROM recipe_view';
    db2.all(selectSql, (err, data) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            return res.status(500).json({ error: 'Error fetching recipes from database' });
        }
        return res.json(data);
    });
});

app.post('/addRecipe', (req, res) => {
    if (req.body) {
        const selectLastIdxSql = 'SELECT "index" FROM recipe_view ORDER BY "index" DESC LIMIT 1';
        db2.get(selectLastIdxSql, (err, row) => {
            if (err) {
                console.error('Error fetching last index:', err);
                return res.status(500).json({ error: 'Error fetching last index from database' });
            }
            const lastIndex = row ? row.index : 0;
            const newIndex = lastIndex + 1;
            const { respNameA, ratingA, ingredientsA, servingsA, nutritionA, timingA, directionsA } = req.body;
            const insertSql = `INSERT INTO recipe_view ("index", recipe_name, rating, ingredients, servings, nutrition, timing, directions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [newIndex, respNameA, ratingA, ingredientsA, servingsA, nutritionA, timingA, directionsA];
            
            db2.run(insertSql, values, function(err) {
                if (err) {
                    console.error('Error adding recipe:', err);
                    return res.status(500).json({ error: 'Error adding recipe to database' });
                }
                return res.status(201).json({ message: 'Recipe added successfully', id: this.lastID });
            });
        });
    }
});


// Update recipe
app.post('/updateRecipe', (req, res) => {
    const { FindIdxA, newRespNameA, newRatingA, newIngredientsA, newServingsA, newNutritionA, newTimingA, newDirectionsA } = req.body;
    const updateSql = `UPDATE recipe_view SET recipe_name = ?, rating = ?, ingredients = ?, servings = ?, nutrition = ?, timing = ?, directions = ? WHERE "index" = ?`;
    const values = [newRespNameA, newRatingA, newIngredientsA, newServingsA, newNutritionA, newTimingA, newDirectionsA, FindIdxA];
    
    db2.run(updateSql, values, function(err) {
        if (err) {
            console.error('Error updating recipe:', err);
            return res.status(500).json({ error: 'Error updating recipe in database' });
        }
        return res.status(200).json({ message: 'Recipe updated successfully' });
    });
});

// Delete recipe
app.post('/deleteRecipe', (req, res) => {
    const { delete_RecipeA } = req.body;
    const deleteSql = `DELETE FROM recipe_view WHERE "index" = ?`;
    
    db2.run(deleteSql, [delete_RecipeA], function(err) {
        if (err) {
            console.error('Error deleting recipe:', err);
            return res.status(500).json({ error: 'Error deleting recipe from database' });
        }
        return res.status(200).json({ message: 'Recipe deleted successfully' });
    });
});

// Attempt to login user
app.post('/loginuser', (req, res) => {
    const { the_username, the_password } = req.body;

    // Check if username and password are provided
    if (!the_username || !the_password) {
        return res.status(400).json({ error: 'Username or password is missing' });
    }

    // Query the database to check if the user exists
    const sqlSelectUser = "SELECT * FROM user_data WHERE username = ? AND password = ?";
    db.get(sqlSelectUser, [the_username, the_password], (err, row) => {
        if (err) {
            console.log("cool beans");
            console.error("Error fetching user:", err);
            return res.status(500).json({ error: 'Error fetching user from database' });
        }

        // If user exists
        if (row) {
            // User exists, update the logged_in attribute to 1
            //const sqlUpdateLoggedIn = "UPDATE user SET logged_in = 1 WHERE the_username = ?";
            //db.run(sqlUpdateLoggedIn, [the_username], (updateErr) => {
                //if (updateErr) {
                    //console.error("Error updating logged_in status:", updateErr);
                    //return res.status(500).json({ error: 'Error updating logged_in status' });
                //}
                //return res.status(200).json({ message: 'Login successful' });
            return res.status(200).json({ message: 'Login successful' });
            //});
        } else {
            // Invalid credentials (User does not exist)
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

async function extractAndTransformRecipeData() {
    return new Promise((resolve, reject) => {
        const selectSql = 'SELECT `index`, recipe_name, servings, ingredients, rating, cuisine_path, nutrition, img_src FROM "user recipe view"';
        db.all(selectSql, (err, rows) => {
            if (err) {
                return reject(`Error fetching recipes from database: ${err.message}`);
            }
            const data = rows.map(row => ({
                _id: String(row.index),  // Assuming `index` is the primary key
                recipe_name: row.recipe_name,
                servings: row.servings,
                ingredients: row.ingredients,
                rating: row.rating,
                cuisine_path: row.cuisine_path,
                nutrition: row.nutrition,
                img_src: row.img_src
            }));
            loadDataToEs("recipes", data)
            resolve(data);
            
        });
    });
}

// Function to load data into Elasticsearch
async function loadDataToEs(indexName, data) {
    const bulkOps = [];
    data.forEach(item => {
        const { _id, ...body } = item;
        bulkOps.push({ index: { _index: indexName, _id } });
        bulkOps.push(body);
    });
    try {
        await client.bulk({ body: bulkOps });
        console.log(`Successfully indexed ${data.length} recipes`);
        
    } catch (error) {
        throw new Error(`Error indexing recipes: ${error.message}`);
    }
}

async function queryRecipes(searchTerm) {
    try {
        const response = await client.search({
            index: 'recipes',
            body: {
                query: {
                    bool: {
                        should: [
                            { match_phrase_prefix: { recipe_name: searchTerm } },
                            { match_phrase_prefix: { ingredients: searchTerm } }
                        ]
                    }
                }
            }
        });
        console.log('Search results:', response.hits.hits);
        return response.hits.hits.map(hit => hit._source);  // Extract _source to return to frontend
    } catch (error) {
        throw new Error(`Error querying Elasticsearch: ${error.message}`);
    }
}

// Endpoint to search recipes
app.get('/queryRecipes', async (req, res) => {
    let searchTerm = req.query.searchTerm;
    try {
        let esResponse = await queryRecipes(searchTerm);
        console.log('Sending search results to frontend:', esResponse);
        res.status(200).json(esResponse);  // Ensure the response is sent as JSON
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3001, () => {
    console.log("listening");
});