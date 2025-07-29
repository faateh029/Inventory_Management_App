import express from 'express';
import ejs from 'ejs'
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
app.use('/' , inventoryRouter);
// app.get('/' , (req , res)=>{
//     console.log("get request");
//     res.status(200).json({msg:"get request running"});
// })

app.listen(PORT , (req,res)=>{
    console.log(`server running on port ${PORT}`)
})