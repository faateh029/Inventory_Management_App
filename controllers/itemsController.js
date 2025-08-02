import {pool} from '../db/pool.js';
import { Category } from '../models/category.js';
import { Item } from '../models/item.js';
export const get_items_of_category_controller = async (req,res)=>{
    //handeling category_id
       const catId = Number(req.params.cat_id);
       const category= await Category.findByPk(catId);
       if(!category){
        return res.status(404).json({msg:"Cateogry with this id was not found"})
       }
       //pagination
       const page = parseInt(req.query.page)||1;
       const limit = parseInt(req.query.limit)||5;
       const offset = (page-1)*limit;
       
       const items = await Item.findAll({
        where:{category_id:catId},
        order:[['item_id' , 'ASC']],
        limit,
        offset
       })

       //preparing result
       const totalCount = await Item.count({where:{category_id:catId}})
     if (totalCount === 0) {
    return res.redirect(`/category/${catId}/items/new`);
  }
       res.status(200).render("view_items", {
    items: items,
    category_id: catId,
    category_name: category.category_name,
    page,
    totalPages: Math.ceil(totalCount/ limit)
  });
}

export const get_item_form_controller = async (req,res)=>{
            const cat_id = req.params.cat_id ; 
            const category = await Category.findByPk(cat_id);
            if(!category){
                return res.status(404).json({msg:"no such category found"})
            }
            res.status(200).render('new_item' , {cat_id:cat_id});
}

export const post_new_item_controller = async (req , res)=>{
          const cat_id = req.params.cat_id ; 
            const cat_id_checker = await pool.query(`SELECT category_id FROM categories WHERE category_id=($1)` , [cat_id]);
            if(cat_id_checker.rows.length===0){
                return res.status(404).json({msg:"category not found"})
            }
  
        const new_item_name = req.body.item_name ; 
        const new_item_price = Number(req.body.item_price );
         const new_item_quantity =Number(req.body.item_quantity) ;
         const new_item_brand = req.body.item_brand;
        const new_item_description = req.body.item_description;
        const new_item_color = req.body.item_color;
        if (
    !new_item_name ||
    isNaN(new_item_price) ||
    isNaN(new_item_quantity) ||
    !new_item_brand ||
    !new_item_description ||
    !new_item_color
  ) {
    return res.status(400).json({ msg: "All fields are required and must be valid numbers/text." });
  }
         await pool.query(`INSERT INTO items (item_name,item_price,item_quantity,item_brand,item_description ,item_color , category_id) VALUES ($1 ,$2, $3, $4, $5, $6, $7) ` , [new_item_name,new_item_price,new_item_quantity,new_item_brand,new_item_description ,new_item_color ,cat_id]);

         res.redirect(`/category/${cat_id}/items`);
}

export const get_edit_item_form_controller = async (req, res)=>{

          const item_id = parseInt(req.params.it_id);
  const cat_id = parseInt(req.params.cat_id);
  const item_result = await Item.findOne({
    where: {
      item_id: item_id,
      category_id: cat_id
    }
  });
   if (!item_result) {
    return res.status(400).json({ msg: "Saba Qamar not found" });
  }
   res.status(200).render('edit_item', {
    cat_id: cat_id,
    item_result: item_result 
  });
        //   const item_id = parseInt(req.params.it_id ); 
        //   const cat_id = parseInt(req.params.cat_id) ;
        //  const item_result =  await pool.query(`SELECT * FROM items WHERE item_id = ($1) AND category_id = ($2)` , [item_id , cat_id] )
        //  if(item_result.rows.length===0){
        //     return res.status(400).json({msg:"Saba Qamar not found"})
        //  }
        //  res.status(200).render('edit_item' , {cat_id:cat_id,item_result:item_result.rows[0]})
}


export const delete_item_controller = async (req,res)=>{
    const cat_id = parseInt(req.params.cat_id);
    const item_id = parseInt(req.params.it_id);
    const item_checker = await pool.query(`SELECT item_id FROM items WHERE category_id =($1) AND item_id = ($2)` , [cat_id , item_id])
    if(item_checker.rows.length===0){
       return res.status(404).json({msg:"404 not found!"})
    }
    await pool.query(`DELETE FROM items WHERE category_id=($1) AND item_id = ($2)` , [cat_id,item_id])
    res.status(204).send();
}



export const get_one_item_controller = async(req , res)=>{
    const cat_id = parseInt(req.params.cat_id);
    const item_id = parseInt(req.params.it_id);
    const item_id_checker = await pool.query(`SELECT 1 FROM items WHERE item_id = ($1) AND category_id = ($2)`, [item_id , cat_id]);
    if(item_id_checker.rows.length===0){
        return res.status(404).json({msg:"404 Not found!"})
    }
    
    // Process requested fields
    let selectedColumns = "*";  // default to all
    let requestedFields=[];
    const fields = req.query.fields;
    if (fields) {
        const allowedFields = [
            "item_id",
            "category_id",
            "item_name",
            "item_price",
            "item_quantity",
            "item_brand",
            "item_description",
            "item_color"
        ];
        requestedFields = fields
            .split(",")
            .map(f => f.trim())
            .filter(field => allowedFields.includes(field));

        if (requestedFields.length > 0) {
            selectedColumns = requestedFields.join(",");
        }
        
    }

    // Run the query
    const result = await pool.query(
        `SELECT ${selectedColumns} FROM items WHERE item_id = $1 AND category_id = $2`,
        [item_id, cat_id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ msg: "Item or category not found" });
    }
      if (!result.rows[0].category_id) {
  result.rows[0].category_id = cat_id;
}
    res.status(200).render("view_single_item", {
    item: result.rows[0],
    selectedFields: requestedFields
  });
}


export const patch_edited_item_controller = async (req, res) => {
    const cat_id = parseInt(req.params.cat_id);
    const item_id = parseInt(req.params.it_id);

    const new_item_name = req.body.item_name;
    const new_item_price = req.body.item_price;
    const new_item_quantity = req.body.item_quantity;
    const new_item_brand = req.body.item_brand;
    const new_item_description = req.body.item_description;
    const new_item_color = req.body.item_color;

    if (
        !item_id || !cat_id ||
        !new_item_name || !new_item_price || !new_item_quantity
    ) {
        return res.status(400).json({ msg: "No required field can be missed" });
    }

    const result = await pool.query(
        `SELECT * FROM items WHERE item_id = $1 AND category_id = $2`,
        [item_id, cat_id]
    );

    if (result.rows.length === 0) {
        return res.status(400).json({ msg: "Ramsha Khan not found" });
    }

    await pool.query(
        `UPDATE items SET 
            item_name = $1, 
            item_price = $2,
            item_quantity = $3, 
            item_brand = $4,
            item_description = $5, 
            item_color = $6
         WHERE item_id = $7 AND category_id = $8`,
        [
            new_item_name,
            new_item_price,
            new_item_quantity,
            new_item_brand,
            new_item_description,
            new_item_color,
            item_id,
            cat_id
        ]
    );

    res.redirect(`/category/${cat_id}/items`)
};


