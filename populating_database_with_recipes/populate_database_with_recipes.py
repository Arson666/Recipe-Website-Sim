import mysql.connector
import csv
import random
import string



def generate_random_password(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))




# Connection parameters
host = "localhost"
user = "root"
password = "Magicman102"
database = "cmsc_447_group_project"

# Establish connection
connection = mysql.connector.connect(
    host=host,
    user=user,
    password=password,
    database=database
)

# Create cursor
cursor = connection.cursor()



csv_file_path = 'C:/Users/Owner/Desktop/REACT JS APP 4/populating_database_with_recipes/recipes.csv'


# 157 random emails
emails = [
    'jackson.keyser@gmail.com', 'james.smith@yahoo.com', 'olivia.williams@hotmail.com', 
    'ethan.jones@outlook.com', 'ava.taylor@aol.com', 'liam.anderson@gmail.com', 
    'emma.johnson@yahoo.com', 'noah.brown@hotmail.com', 'sophia.miller@outlook.com', 
    'mason.wilson@aol.com', 'isabella.moore@gmail.com', 'logan.davis@yahoo.com', 
    'oliver.garcia@hotmail.com', 'amelia.rodriguez@outlook.com', 'elijah.martinez@aol.com', 
    'charlotte.hernandez@gmail.com', 'benjamin.mitchell@yahoo.com', 'amelia.carter@hotmail.com', 
    'lucas.perez@outlook.com', 'mia.roberts@aol.com', 'ethan.torres@gmail.com', 
    'isabella.collins@yahoo.com', 'mason.turner@hotmail.com', 'ava.phillips@outlook.com', 
    'noah.lopez@aol.com', 'olivia.king@gmail.com', 'james.howard@yahoo.com', 
    'sophia.kelly@hotmail.com', 'william.baker@outlook.com', 'emma.brooks@aol.com', 
    'alexander.bailey@gmail.com', 'michael.richardson@yahoo.com', 'matthew.nelson@hotmail.com', 
    'charlotte.flores@outlook.com', 'daniel.rivera@aol.com', 'william.lee@gmail.com', 
    'emily.gonzalez@yahoo.com', 'michael.walker@hotmail.com', 'oliver.hall@outlook.com', 
    'emma.sanchez@aol.com', 'joseph.mitchell@gmail.com', 'david.carter@yahoo.com', 
    'henry.perez@hotmail.com', 'michael.roberts@outlook.com', 'james.bailey@aol.com', 
    'jacob.howard@gmail.com', 'benjamin.richardson@yahoo.com', 'emma.nelson@hotmail.com', 
    'noah.flores@outlook.com', 'william.rivera@aol.com', 'ava.gonzalez@gmail.com', 
    'mason.walker@yahoo.com', 'olivia.hall@hotmail.com', 'amelia.sanchez@outlook.com', 
    'ethan.mitchell@aol.com', 'mia.carter@gmail.com', 'oliver.lopez@yahoo.com', 
    'sophia.king@hotmail.com', 'liam.baker@outlook.com', 'isabella.bailey@aol.com', 
    'olivia.richardson@gmail.com', 'noah.howard@yahoo.com', 'emma.rivera@hotmail.com', 
    'charlotte.nelson@outlook.com', 'william.bailey@aol.com', 'ava.richardson@gmail.com', 
    'mason.howard@yahoo.com', 'oliver.rivera@hotmail.com', 'amelia.nelson@outlook.com', 
    'ethan.bailey@aol.com', 'mia.gonzalez@gmail.com', 'olivia.walker@yahoo.com', 
    'noah.hall@hotmail.com', 'emma.sanchez@outlook.com', 'charlotte.mitchell@aol.com', 
    'william.lopez@gmail.com', 'mason.king@yahoo.com', 'oliver.hall@hotmail.com', 
    'sophia.mitchell@outlook.com', 'liam.gonzalez@aol.com', 'isabella.walker@gmail.com', 
    'noah.howard@yahoo.com', 'emma.rivera@hotmail.com', 'charlotte.nelson@outlook.com', 
    'william.bailey@aol.com', 'ava.richardson@gmail.com', 'mason.howard@yahoo.com', 
    'oliver.rivera@hotmail.com', 'amelia.nelson@outlook.com', 'ethan.bailey@aol.com', 
    'mia.gonzalez@gmail.com', 'olivia.walker@yahoo.com', 'noah.hall@hotmail.com', 
    'emma.sanchez@outlook.com', 'charlotte.mitchell@aol.com', 'william.lopez@gmail.com', 
    'mason.king@yahoo.com', 'oliver.hall@hotmail.com', 'sophia.mitchell@outlook.com', 
    'liam.gonzalez@aol.com', 'isabella.walker@gmail.com', 'olivia.richardson@yahoo.com', 
    'noah.howard@hotmail.com', 'emma.rivera@outlook.com', 'charlotte.nelson@aol.com', 
    'william.bailey@gmail.com', 'ava.richardson@yahoo.com', 'mason.howard@hotmail.com', 
    'oliver.rivera@outlook.com', 'amelia.nelson@aol.com', 'ethan.bailey@gmail.com', 
    'mia.gonzalez@yahoo.com', 'olivia.walker@hotmail.com', 'noah.hall@outlook.com', 
    'emma.sanchez@aol.com', 'charlotte.mitchell@gmail.com', 'william.lopez@yahoo.com', 
    'mason.king@hotmail.com', 'oliver.hall@outlook.com', 'sophia.mitchell@aol.com', 
    'liam.gonzalez@gmail.com', 'isabella.walker@yahoo.com', 'olivia.richardson@hotmail.com', 
    'noah.howard@outlook.com', 'emma.rivera@aol.com', 'charlotte.nelson@gmail.com', 
    'william.bailey@yahoo.com', 'ava.richardson@hotmail.com', 'mason.howard@outlook.com', 
    'oliver.rivera@aol.com', 'amelia.nelson@gmail.com', 'ethan.bailey@yahoo.com', 
    'mia.gonzalez@hotmail.com', 'olivia.walker@outlook.com', 'noah.hall@aol.com', 
    'emma.sanchez@gmail.com', 'charlotte.mitchell@yahoo.com', 'william.lopez@hotmail.com', 
    'mason.king@outlook.com', 'oliver.hall@aol.com', 'sophia.mitchell@gmail.com', 
    'liam.gonzalez@yahoo.com', 'isabella.walker@hotmail.com', 'olivia.richardson@aol.com', 
    'noah.howard@gmail.com', 'emma.rivera@yahoo.com', 'charlotte.nelson@hotmail.com', 
    'william.bailey@outlook.com', 'ava.richardson@aol.com', 'mason.howard@gmail.com', 
    'oliver.rivera@yahoo.com', 'amelia.nelson@hotmail.com', 'ethan.bailey@outlook.com', 
    'mia.gonzalez@aol.com', 'olivia.walker@gmail.com', 'noah.hall@yahoo.com', 
    'emma.sanchez@yahoo.com' ]


# Extract usernames from emails
usernames = [email.split('@')[0] for email in emails]



# Create random passwords
random_passwords = [generate_random_password(10) for _ in range(300)]


currIndex = 0

# Populate users
for i in range(157):
    currIndex = currIndex + 1

    is_admin = 0
    logged_in = 0

    if(currIndex == 1):
        is_admin = 1

    sql = """INSERT INTO user
                (user_id, the_email, the_username, the_password, is_admin, logged_in) 
                VALUES (%s, %s, %s, %s, %s, %s)"""
    values = (currIndex, emails[i], usernames[i], random_passwords[i], is_admin, logged_in)
    
    # Execute your SQL query using your database connection and cursor
    cursor.execute(sql, values)

# Commit the changes to the database
connection.commit()
    



with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file)

    counter = 0

    for row in csv_reader:
        counter = counter + 1


        recipe_id = counter
        user_id = random.randint(1, 157)
        recipe_name = row[1]
        total_time = row[4]
        servings = row[5]
        ingredients = row[7]
        directions = row[8]
        cuisine_path = row[11]
        nutrition = row[12]
        img_src = row[14]

        if(counter != 1):
            sql = """INSERT INTO recipe
                (recipe_id, user_id, recipe_name, total_time, servings, ingredients, directions, cuisine_path, nutrition, img_src) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
            values = (recipe_id, user_id, recipe_name, total_time, servings, ingredients, directions, cuisine_path, nutrition, img_src)
        
            # Execute your SQL query using your database connection and cursor
            cursor.execute(sql, values)

    # Commit the changes to the database
    connection.commit()


# Creating ratings
for i in range(1000):
    rating_id = i
    user_id = random.randint(1, 157)
    recipe_id = random.randint(2, 1001)
    rating = random.uniform(0, 5)



    sql = """INSERT INTO rating
        (rating_id, user_id, recipe_id, rating) 
        VALUES (%s, %s, %s, %s)"""
    values = (rating_id, user_id, recipe_id, rating)

    # Execute your SQL query using your database connection and cursor
    cursor.execute(sql, values)

# Commit the changes to the database
connection.commit()

# Close connection
connection.close()

