import {pool} from '../db/pool.js';
import { Category } from '../models/category.js';
import { Item } from '../models/item.js';

export const get_categories_controller = async (req,res)=>{

   const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;
  //total count
   const totalCount = await Category.count();
//get paginated data
const paginatedData = await Category.findAll({
    order: [['category_id', 'ASC']],
    limit: limit,
    offset: offset
  });
  // build result
   const result = {
    page: page,
    limit: limit,
    total: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    data: paginatedData
    };
     res.status(200).render('list_categories', result);

    // const page = parseInt(req.query.page )||1;
    // const limit = parseInt(req.query.limit) ||5;
    // const offset = (page-1)*limit ; 
    // const totalCount = await pool.query(`SELECT COUNT(*) FROM categories`);
    // const paginatedData = await pool.query(`SELECT * FROM categories ORDER BY category_id  LIMIT $1 OFFSET $2` , [limit , offset])
    // const result = {
    //     page:page,
    //     limit:limit,
    //     total:totalCount.rows[0].count,
    //     totalPages: Math.ceil(Number(totalCount.rows[0].count/limit)),
    //     data:paginatedData.rows,
    // }
    // res.status(200).render("list_categories" , result);
} 

export const get_category_form_controller = async (req ,res)=>{
         res.status(200).render('add_category');
} 

export const post_new_category_controller = async (req,res)=>{

          const cat_name = req.body.category_name;
          //inserting new row
          await Category.create({
          category_name: cat_name
          });
          res.status(200).redirect('/categories');
          //  const cat_name  = req.body.category_name ; 
          //  await pool.query(`INSERT INTO categories (category_name) VALUES ($1)` , [cat_name]);
          //  res.status(200).redirect("/categories")
          }

export const get_category_edit_form_controller = async (req,res)=>{
  const cat_id = parseInt(req.params.cat_id);
    console.log(cat_id);

  const cat_result= await Category.findByPk(cat_id);
  console.log(cat_result) ;
 if (!cat_result) {
    return res.status(400).json({ msg: "Category not found" });
  }
  res.status(200).render('edit_category', { category: cat_result });
  
        // const cat_id = req.params.cat_id ; 
        //  const cat_result =  await pool.query(`SELECT * FROM categories WHERE category_id = ($1)` , [cat_id] )
        //  if(cat_result.rows.length===0){
        //     return res.status(400).json({msg:"Category not found"})
        //   }
        //   //res.status(200).json(cat_result.rows);
        // res.status(200).render('edit_category' , {category:cat_result.rows[0]});
}


export const delete_category_controller = async (req,res)=>{
  const cat_id=parseInt(req.params.cat_id);
  if (!cat_id) {
    return res.status(404).json({ msg: "Enter correct category id" });
  }

   const itemsInCategory = await Item.count({
    where: {
      category_id: cat_id
    }
  });
  if (itemsInCategory === 0) {
    await Category.destroy({
      where: {
        category_id: cat_id
      }
    });
    return res.status(204).send();
  } else {
    return res.status(409).json({
      msg: "Cannot delete category: items exist within this category."
    });
  }
      // const cat_id = parseInt(req.params.cat_id);
      // if(!cat_id){
      //   return res.status(404).json({msg:"Enter correct category id"})
      // }
      // const itemsInCategory = await pool.query(`SELECT COUNT(*) FROM items WHERE category_id = ($1)` , [cat_id]);
      // if(Number(itemsInCategory.rows[0].count) ===0){
      //   await pool.query(`DELETE FROM categories WHERE category_id = ($1)`,[cat_id]);
      //   return res.status(204).send();
      // }else{
      //   return res.status(409).json({ msg: "Cannot delete category: items exist within this category." });
      // }
}




export const patch_edited_category_controller = async (req,res)=>{
         const cat_id = parseInt(req.params.cat_id);

  //checking if cateogry exists
  const cat_id_checker = await Category.findByPk(cat_id);
  if (!cat_id_checker) {
    return res.status(404).json({ msg: "404 not category id not found" });
  }
           const edited_name = req.body.category_name;
          if (!edited_name) {
    return res.status(400).json({ msg: "Category name cannot be a null value" });
  }
           await Category.update(
    { category_name: edited_name },
    { where: { category_id: cat_id } }
  );
          //res.status(200).json({msg:"category updated successfully"})
          res.redirect("/categories");
}