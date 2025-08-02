import express from 'express';
import ejs from 'ejs'
import {sequelize} from './db/sequelize.js';
import { Item } from './models/item.js';
import { Category } from './models/category.js';
import methodOverride from 'method-override';
import { inventoryRouter } from './routes/route.js';
import { fileURLToPath } from 'url';
import path from 'path';
const PORT = process.env.PORT||4200;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(methodOverride('_method'));

app.use('/' , inventoryRouter);
try {
    await sequelize.authenticate();
    //console.log("db connected")
    // db connected
    await sequelize.sync({alter:true});
    //console.log("models synced");
} catch (error) {
   // console.log("sequelize sync error" , error)
}
app.listen(PORT , (req,res)=>{
    console.log(`server running on port ${PORT}`)
})