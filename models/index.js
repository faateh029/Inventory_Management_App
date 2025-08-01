import { Sequelize, DataTypes } from "sequelize";
import createCategoryModel from './category.js';
import createItemModel from './item.js';


const sequelize= new Sequelize("postgres://postgres:123@localhost:5432/electronics_inventory");

const Category = createCategoryModel(sequelize , DataTypes);
const Item = createItemModel(sequelize,DataTypes);

Category.hasMany(items, {
    foreignKey:'category_id' , 
    onDelete:'RESTRICT'
});

Item.belongsTo(Category , {
    foreignKey:'category_id',
    onDelete:'Restrict'
});

export {sequelize,Item,Category};