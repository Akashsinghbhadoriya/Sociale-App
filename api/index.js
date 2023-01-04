const express= require('express');
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");
const postRoute=require("./routes/posts");
const multer=require("multer");
const path=require("path");
const jwt=require("jsonwebtoken");

dotenv.config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
    console.log("Connected to MongoDB");
}).catch(()=>{
    console.log("Not Connected to MongoDB");
})

app.use("/images", express.static(path.join(__dirname,"public/images")));

//middleware
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));

const verify=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){
        const token=authHeader;

        jwt.verify(token, process.env.SECRET_KEY , (err)=>{
            if(err){
                return res.status(403).json("Token is invalid");
            }
        })
        next();
    } else{
        res.status(401).json("you are not authenticated");
    }
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null, req.body.name);
    }
})

const upload = multer({storage: storage});
app.post("/api/upload",upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("file uploaded");
    } catch(err){
        console.log(err);
    }
});
app.use("/api/users",verify , userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",verify ,postRoute);


app.listen(8800,()=>{
    console.log("Listening on port 8800 hello");
});