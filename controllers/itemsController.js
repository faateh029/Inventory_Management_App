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
            const cat_id = req.params.cat_id ; 
            const cat_id_checker = await pool.query(`SELECT category_id FROM categories WHERE category_id=($1)` , [cat_id]);
            if(cat_id_checker.rows.length===0){
                return res.status(404).json({msg:"no such category found"})
            }
            res.status(200).render('new_item.ejs' , {cat_id:cat_id});
}

export const post_new_item_controller = async (req , res)=>{
          const cat_id = req.params.cat_id ; 
            const cat_id_checker = await pool.query(`SELECT category_id FROM categories WHERE category_id=($1)` , [cat_id]);
            if(cat_id_checker.rows.length===0){
                return res.status(404).json({msg:"no such category found"})
            }

        const new_item_name = req.body.item_name ; 
        const new_item_price = req.body.item_price ;
         const new_item_quantity = req.body.item_quantity;
         const new_item_brand = req.body.item_brand;
        const new_item_description = req.body.item_description;
        const new_item_color = req.body.item_color;
         await pool.query(`INSERT INTO items (item_name,item_price,item_quantity,item_brand,item_description ,item_color , category_id) VALUES ($1 ,$2, $3, $4, $5, $6, $7) ` , [new_item_name,new_item_price,new_item_quantity,new_item_brand,new_item_description ,new_item_color ,cat_id]);
          res.status(200).json({msg:"item added successfully"});
}

export const get_edit_item_form_controller = async (req, res)=>{
          const item_id = parseInt(req.params.it_id ); 
          const cat_id = parseInt(req.params.cat_id) ;
         const item_result =  await pool.query(`SELECT * FROM items WHERE item_id = ($1) AND category_id = ($2)` , [item_id , cat_id] )
         if(item_result.rows.length===0){
            return res.status(400).json({msg:"Ramsha Khan not found"})
         }
         res.status(200).render('edit_item.ejs' , {category_id:cat_id,item_result:item_result.rows[0]})
}

export const patch_edited_item_controller = async (req,res)=>{

}