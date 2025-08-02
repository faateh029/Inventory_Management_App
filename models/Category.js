import { DataTypes , Model } from "sequelize";
import {sequelize} from '../db/sequelize.js';

export class Category extends Model{}

Category.init({
    category_id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
    },
    category_name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
},  {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: false
});