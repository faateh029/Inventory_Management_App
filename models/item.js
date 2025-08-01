import { DataTypes, Sequelize } from "sequelize";
import category from "./category";

export default (Sequelize , DataTypes)=>{
    const Item = Sequelize.define("items" , {
        item_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        category_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        item_price:{
            type:DataTypes.DECIMAL(10,2) , 
            allowNull:false,

        },
        item_name:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        item_quantity:{
            type:DataTypes.INEGER,
            validate:{
                min:0
            }
        },
        item_brand:{
            type:DataTypes.TEXT
        },
        item_description:{
            type:DataTypes.TEXT
        },
        item_color:{
            type:DataTypes.TEXT
        }
        },
        {
            timeStamps:false ,
            freezeTableName:true
        })
    return Item;
    }