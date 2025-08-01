import express from 'express';
import { sequelize, Category, Item } from './models/index.js';
import ejs from 'ejs'
import methodOverride from 'method-override';
import { inventoryRouter } from './routes/route.js';
import { fileURLToPath } from 'url';
import path from 'path';
const PORT = process.env.PORT||4200;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function start() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL database");

    // ⚠️ DON'T use { force: true } if tables already exist!
    await sequelize.sync();

    console.log("✅ Sequelize synced (without changing your SQL tables)");

  } catch (error) {
    console.error("❌ Failed to connect to the DB:", error);
  }
}

start();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(methodOverride('_method'));

app.use('/' , inventoryRouter);
app.listen(PORT , (req,res)=>{
    console.log(`server running on port ${PORT}`)
})