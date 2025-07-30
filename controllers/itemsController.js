import {pool} from '../db/pool.js';
export const get_items_of_category_controller = async (req,res)=>{
    //handeling category_id
       const catId = Number(req.params.cat_id);
       const cat_id_checker = await pool.query(`SELECT category_id FROM categories WHERE category_id = $1` , [catId])
       if(cat_id_checker.rows.length===0){
        return res.status(404).json({"msg":"Cateogry with this id was not found"})
       }
       //pagination
       const page = parseInt(req.query.page)||1;
       const limit = parseInt(req.query.limit)||5;
       const offset = (page-1)*limit;
       
       const paginatedResult = await pool.query(`SELECT * FROM items WHERE category_id = $1 ORDER BY item_id LIMIT $2 OFFSET $3 `,[catId , limit , offset]);

       //preparing result
       const totalCount =await pool.query(`SELECT COUNT(*) FROM items WHERE category_id = $1` , [catId]);
       if(Number(totalCount.rows[0].count) === 0){
        return res.status(404).json({"msg":"Items not found"})
       }
       const result = {
        page:page,
        limit:limit,
        total:totalCount.rows[0].count,
        totalPages:Math.ceil(Number(totalCount.rows[0].count/limit)),
        result:paginatedResult.rows
       }
       res.status(200).json(result)
}

export const get_item_form_controller = async (req,res)=>{

}

export const post_new_item_controller = async (req , res)=>{

}

export const get_edit_item_form_controller = async (req, res)=>{

}

export const patch_edited_item_controller = async (req,res)=>{

}