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
        data:paginatedData.rows
    }
    res.status(200).json(result);

} 

export const get_category_form_controller = async (req ,res)=>{
         res.status(200).render('new_category.ejs');
} 

export const post_new_category_controller = async (req,res)=>{
           const cateogry_name  = req.body.category_name ; 
           await pool.query(``)
}

export const get_category_edit_form_controller = async (req,res)=>{

}

export const patch_edited_category_controller = async (req,res)=>{

}