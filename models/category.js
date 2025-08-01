//import { DataTypes, Sequelize } from "sequelize";

export default (Sequelize , DataTypes)=>{
    const Category = Sequelize.define("categories" , {
        category_id:{
            type:DataTypes.INTEGER , 
            primaryKey:true ,
            autoIncrement:true
        },
        category_name:{
            type: DataTypes.TEXT ,
            allowNull:false
        }
    } , {
        timeStamps:false , 
        freezeTableName:true
     })
     return Category;
}

