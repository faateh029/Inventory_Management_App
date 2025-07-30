import {Router} from 'express';
export const inventoryRouter = new Router();
//paginated list of all categories
inventoryRouter.get('/categories' , get_categories_controller);


//prints the form for adding a new category
inventoryRouter.get('/categories/new' , get_category_form_controller);


//adds new category
inventoryRouter.post('/categories' , post_new_category_controller);


//prints all items of a category
inventoryRouter.get('/category/:cat_id' , get_items_of_category_controller);


//prints form of adding a new item in a specific category
inventoryRouter.get('/category/:cat_id/items/new' , get_item_form_controller);


//adds a new item in that category
inventoryRouter.post('/category/:cat_id/items' , post_new_item_controller);


//prints the pre written form for editing fields of an item
inventoryRouter.get('/category/:cat_id/items/:it_id/edit' , get_edit_item_form_controller);


//patches specific fields for that item
inventoryRouter.patch('/category/:cat_id/items/:it_id' , patch_edited_item_controller);


//prints pre written form for editing the category fields
inventoryRouter.get('/category/:cat_id/edit' , get_category_edit_form_controller);


//patches the field of that category
inventoryRouter.patch('/category/:cat_id' , patch_edited_category_controller);