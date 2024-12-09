DROP DATABASE IF EXISTS cmsc_447_group_project;
CREATE DATABASE cmsc_447_group_project;
USE cmsc_447_group_project;



create table user
	(user_id        numeric(6,0),
     the_email		varchar(50),
	 the_username		varchar(50),
     the_password   varchar(50),
	 is_admin    tinyint,
     logged_in   tinyint,
     primary key (user_id)
	);   
    
    
    
create table recipe
	(recipe_id		numeric(6,0),
	 user_id        numeric(6,0),
     recipe_name        varchar(500),
     total_time      varchar(500),
	 servings       varchar(500),
     ingredients   varchar(2000),
     directions    varchar(5000),
     cuisine_path   varchar(500),
     nutrition   varchar(500),
     img_src     varchar(500),
     primary key (recipe_id),
     foreign key (user_id) references user(user_id)
	);
    
    
    
create table rating
	(rating_id		numeric(6,0),
	 user_id        numeric(6,0),
     recipe_id       numeric(6,0),
	 rating         decimal(6, 2),
     primary key (rating_id),
     foreign key (user_id) references user(user_id),
     foreign key (recipe_id) references recipe(recipe_id)
	);
    
    
SELECT * FROM user;
SELECT * FROM recipe;
SELECT * FROM rating;





