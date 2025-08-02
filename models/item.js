// models/Item.js
import { DataTypes, Model } from 'sequelize';
import {sequelize} from '../db/sequelize.js';
import { Category } from './category.js';

export class Item extends Model {}

Item.init({
  item_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'category_id'
    },
    onDelete: 'RESTRICT'
  },
  item_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  item_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  item_quantity: {
    type: DataTypes.INTEGER,
    validate: { min: 0 }
  },
  item_brand: DataTypes.TEXT,
  item_description: DataTypes.TEXT,
  item_color: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Item',
  tableName: 'items',
  timestamps: false
});

// Associations
Item.belongsTo(Category, { foreignKey: 'category_id' });
Category.hasMany(Item, { foreignKey: 'category_id' });