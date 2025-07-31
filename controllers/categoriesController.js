import {pool} from '../db/pool.js';
export const get_categories_controller = async (req,res)=>{
//     const items_count = await pool.query(`SELECT c.category_id, c.category_name, COUNT(i.item_id) AS item_count
// FROM categories c
// LEFT JOIN items i ON c.category_id = i.category_id
// GROUP BY c.category_id
// ORDER BY c.category_id;`)
    const page = parseInt(req.query.page )||1;
    const limit = parseInt(req.query.limit) ||5;
    const offset = (page-1)*limit ; 
    const totalCount = await pool.query(`SELECT COUNT(*) FROM categories`);
    const paginatedData = await pool.query(`SELECT * FROM categories ORDER BY category_id  LIMIT $1 OFFSET $2` , [limit , offset])
    const result = {
        page:page,
        limit:limit,
        total:totalCount.rows[0].count,
        totalPages: Math.ceil(Number(totalCount.rows[0].count/limit)),
        data:paginatedData.rows,
    }
    res.status(200).render("list_categories" , result);
} 

export const get_category_form_controller = async (req ,res)=>{
         res.status(200).render('add_category');
} 

export const post_new_category_controller = async (req,res)=>{
           const cat_name  = req.body.category_name ; 
           await pool.query(`INSERT INTO categories (category_name) VALUES ($1)` , [cat_name]);
           res.status(200).json({msg:"category added successfully"})
}

export const get_category_edit_form_controller = async (req,res)=>{
        const cat_id = req.params.cat_id ; 
         const cat_result =  await pool.query(`SELECT * FROM categories WHERE category_id = ($1)` , [cat_id] )
         if(cat_result.rows.length===0){
            return res.status(400).json({msg:"Category not found"})
          }
          //res.status(200).json(cat_result.rows);
        res.status(200).render('edit_category' , {category:cat_result.rows[0].category_name});
}


export const delete_category_controller = async (req,res)=>{
      const cat_id = parseInt(req.params.cat_id);
      if(!cat_id){
        return res.status(404).json({msg:"Enter correct category id"})
      }
      const itemsInCategory = await pool.query(`SELECT COUNT(*) FROM items WHERE category_id = ($1)` , [cat_id]);
      if(Number(itemsInCategory.rows[0].count) ===0){
        await pool.query(`DELETE FROM categories WHERE category_id = ($1)`,[cat_id]);
        return res.status(204).send();
      }else{
        return res.status(409).json({ msg: "Cannot delete category: items exist within this category." });
      }
}




export const patch_edited_category_controller = async (req,res)=>{
          const cat_id = parseInt(req.params.cat_id);
          const cat_id_checker = await pool.query(`SELECT category_id FROM categories WHERE category_id = ($1)` , [cat_id]);
          if(cat_id_checker.rows.length===0){
            return res.status(404).json({msg:"404 not category id not found"});
          }
          const edited_name = req.body.category_name;
          if(!edited_name){
            return res.status(400).json({msg:"Category name cannot be a null value"})
          }
          await pool.query(`UPDATE categories SET category_name=($1) WHERE category_id = ($2)` , [edited_name , cat_id])
          //res.status(200).json({msg:"category updated successfully"})
          res.status(200).render('list_categories');
}