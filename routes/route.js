import {Router} from 'express';
//importing controller functions from categoriesController.js
import {get_categories_controller,get_category_form_controller,post_new_category_controller,get_category_edit_form_controller ,patch_edited_category_controller , delete_category_controller } from '../controllers/categoriesController.js';

//importing controller functions from itemsController.js
import {get_items_of_category_controller,get_item_form_controller ,post_new_item_controller,get_edit_item_form_controller,patch_edited_item_controller , get_one_item_controller , delete_item_controller , field_query_controller} from '../controllers/itemsController.js'; 

//setting up router
export const inventoryRouter = new Router();


//paginated list of all categories
inventoryRouter.get('/categories' , get_categories_controller);


//prints the form for adding a new category
inventoryRouter.get('/categories/new' , get_category_form_controller);


//adds new category
inventoryRouter.post('/categories' , post_new_category_controller);


//prints paginated items of a category
inventoryRouter.get('/category/:cat_id/items' , get_items_of_category_controller);


//prints form of adding a new item in a specific category
inventoryRouter.get('/category/:cat_id/items/new' , get_item_form_controller);


//adds a new item in that category
inventoryRouter.post('/category/:cat_id/items' , post_new_item_controller);


//deletes a item with a category
inventoryRouter.delete('/category/:cat_id/items/:it_id' , delete_item_controller);


//prints the pre written form for editing fields of an item
inventoryRouter.get('/category/:cat_id/items/:it_id/edit' , get_edit_item_form_controller);

// get only one item of a category
inventoryRouter.get('/category/:cat_id/items/:it_id', get_one_item_controller);

//patches specific fields for that item
inventoryRouter.patch('/category/:cat_id/items/:it_id' , patch_edited_item_controller);


//gets required fields from items table

inventoryRouter.get('/category/:cat_id/items/:it_id/fields' , field_query_controller);


//Delete category route
inventoryRouter.delete('/category/:cat_id' , delete_category_controller);

//prints pre written form for editing the category fields
inventoryRouter.get('/category/:cat_id/edit' , get_category_edit_form_controller);


//patches the field of that category
inventoryRouter.patch('/category/:cat_id' , patch_edited_category_controller);