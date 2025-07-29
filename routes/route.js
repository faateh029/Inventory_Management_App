import {Router} from 'express';
export const inventoryRouter = new Router();

inventoryRouter.get('/categories' , get_categories_controller);
inventoryRouter.get('/categories/new' , get_category_form_controller);
inventoryRouter.post('/categories' , post_new_category_controller);
inventoryRouter.get('/category/:cat_id' , get_items_of_category_controller);
inventoryRouter.get('/category/:cat_id/items/new' , get_item_form_controller);
inventoryRouter.post('/category/:cat_id/items' , post_new_item_controller);
inventoryRouter.get('/category/:cat_id/items/:it_id/edit' , get_edit_id_form_controller);
inventoryRouter.patch('/category/:cat_id/items/:it_id' , patch_edited_item_controller);
inventoryRouter.get('/category/:cat_id/edit' , get_category_edit_form_controller);
inventoryRouter.patch('/category/:cat_id' , patch_edited_category_controller);