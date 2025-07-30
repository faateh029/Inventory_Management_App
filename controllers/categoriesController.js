import {pool} from '../db/pool.js';
export const get_categories_controller = async (req,res)=>{
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

}

export const get_category_edit_form_controller = async (req,res)=>{

}

export const patch_edited_category_controller = async (req,res)=>{

}