import { Sequelize } from "sequelize";
const sequelize = new Sequelize('electronics_inventory' , 'postgres' , '123' , {
    host:'localhost',
    dialect:'postgres'
});
export default sequelize;