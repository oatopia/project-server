import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import userRouter from './router/userRouter.js'
import matchRouter from './router/matchRouter.js'
import dormRouter from './router/DormRouter.js'
import adminRouter from './router/AdminRouter.js'
import visitorRouter from './router/visitorRouter.js'
import db from './util/database.js'
import session from 'express-session'
import path from 'path'
import fileupload from 'express-fileupload'
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

app.get( '/', ( req, res ) => {
    res.render('home')
} );

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
// app.get('/factor',(req,res)=>{
//     db.query("SELECT * FROM factor",(err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     });
// });


// app.post('/log',(req,res)=>{
//     const username = req.body.username;
//     const password = req.body.password;
//     db.query("SELECT * FROM userinformation WHERE username = ? ",username,(err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
            
//             if(username == result[0].username){
//                 if(password == result[0].password){
//                     res.send(result[0].type);
//                     console.log(result[0].type)
//                 }
//             }
//         }
//     });
// });




// app.post('/create',(req,res)=>{
//     const username = req.body.username;
//     const password =req.body.password;
//     const type = req.body.type;

//     db.query("INSERT INTO userinformation (username,password,type) VALUES(?,?,?)",[username,password,type],(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send("Value Inserted")
//         }
//     });

// })
app.use("/api/user",userRouter);
app.use("/api/match",matchRouter);
app.use('/api/dorm',dormRouter);
app.use('/api/Admin',adminRouter);
app.use('/api/visitor',visitorRouter);




app.listen(port,()=>{
    console.log(`Server running port ${port}`);
});