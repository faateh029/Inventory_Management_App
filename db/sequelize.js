import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('electronics_inventory' , 'postgres' , '123' , {
    host:'localhost',
    dialect:'postgres'
});
