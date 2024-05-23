import express from "express";
import mysql from "mysql"
import cors from 'cors'
import multer from "multer";
import cookieParser  from "cookie-parser";
import path from 'path'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'; 
dotenv.config();


const port =process.env.port || 8081;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))

app.use(express.static('build'))




// const corsOptions ={
//     origin:'http://localhost:3000',   
//     methods:["POST, GET"],
//     credentials:true,
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));


//   app.use(cors())




const storage=multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },

    filename:(req,file,cb)=>{
       // cb(null,file.originalname + "_" + Date.now() + path.extname(file.originalname))
        //cb(null,"ami_"+file.originalname + "_" + Date.now() + path.extname(file.originalname))
        let name=file.originalname.split('.');
        cb(null,name[0] +  path.extname(file.originalname))
    }
})


const upload=multer({
    storage:storage,
})





const db=mysql.createConnection({   
    //  host:'localhost',
    // user:"root",
    // password:"Axis.manish123",
    // database:"signup" 
    
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database 

//  host:'192.168.1.251',
//   user:'root',
//   password:'axis@123',
//   database:'cmd_portal'
})



db.connect((err) => { 
    if (err) { 
      console.log("Database Connection Failed !!!", err); 
    } else { 
      console.log("connected to Database"); 
    } 
}); 



app.post('/api/upload',upload.single('ami'),(req,res)=>{
    let image=req.file.filename;
    //console.log(image);
    const myArray = image.split(".");
    let word = myArray[myArray.length-1];
   //  console.log(word);
     
    
    if(word!=="pdf" && word!=="img" && word!=="png" && word!=="jpg" && word!=="jpeg" ){
        return res.json({Status:"fail",Message:"Please select a valid file to upload."})
    }
    
    let newDate = new Date()
    const sql1 ="insert into allDataFile(fileName, userRole, uploadDate) values(?,?,?)";

    //image=myArray[0]+"."+word;
   // console.log(image);
    
     db.query(sql1,[image,"Admin",newDate],(err,result)=>{
       // console.log(err);
            if(err)return res.json({Message:err.sqlMessage});
             return  res.json({Status:"Success"}); 
     })
})





app.get('/api/data',(req,res)=>{
    const sql="select * from allDataFile";
    db.query(sql, (err, result)=>{
        if(err)res.json("Error");
        return res.json(result);
    })
})







const verifyUser=(req, res, next)=>{
    const token=req.cookies.token;
    if(!token){
            //return res.json({Message : "we need token please provide it."})
            return res.json({Message : "Session Expired !! "})
    }else {
        jwt.verify(token , "our-jsonwebtoken-secret-key",(err, decoded)=>{
            if(err){
                return res.json({Message : "Authentication Error"})
            }else {
                req.name=decoded.name;
                req.role=decoded.role;
                
                next();
            }

        } )
    }
}



app.get('/api',verifyUser,(req,res)=>{
    return res.json({Status : "Success", name: req.name, role : req.role})
})




app.post('/api/login',(req,res)=>{
    const sql="SELECT * FROM login WHERE email=? AND password=?";
    db.query(sql,[req.body.email, req.body.password],(err, data)=>{
       
        if(err)return res.json({Message:"server Side Error "})
        if(data.length>0){
            const name =data[0].name;
            const role =data[0].role;
           
            const token=jwt.sign({name,role},"our-jsonwebtoken-secret-key",{expiresIn :'1d'});
            res.cookie('token',token);
            return res.json({Status :"Success"})
        }else {
            return res.json({Message:"No Records Existed"});
        }
    })
})



app.post('/api/delete',async(req,res)=>{
   
    const data=req.body
    //console.log(data);
    let name=data.val.fileName;
    let uploadDate =data.val.uploadDate;
   // console.log(name+" "+uploadDate)

    const sql="DELETE FROM allDataFile WHERE fileName=? AND uploadDate=?";
    db.query(sql,[name, uploadDate],(err, data)=>{
       
        if(err)return res.json({Message:"server Side Error "})
        else  return res.json({Status:"Success"});        
    })
})




app.get('/api/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"})
})




app.listen(8081, ()=>{    
    console.log("Running")
})