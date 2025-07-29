CREATE TABLE categories(
category_id SERIAL PRIMARY KEY,
category_name TEXT NOT NULL
);

CREATE TABLE items(
item_id  SERIAL PRIMARY KEY,
category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
item_name TEXT NOT NULL ,
item_price NUMERIC(10,2) NOT NULL CHECK(item_price>=0),
item_quantity INTEGER CHECK(item_quantity>=0) ,
item_brand TEXT,
item_description TEXT ,
item_color TEXT /*added by ALTER syntax later on*/
);