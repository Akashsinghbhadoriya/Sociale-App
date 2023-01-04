const router=require("express").Router();
const User= require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
let refreshTokens=[];

//REGISTER
router.post("/register", async (req,res)=>{

    try{
        //Generate new Encrypted password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser=await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user and return response
        const user=await newUser.save();
        res.status(200).json(user);
    } catch(error){
        res.status(500).json(error);
    }
});

//Refresh Token
router.post("/refresh", (req,res)=>{
    //take refresh token from user
    const refreshToken=req.body.token;
    const user=req.body.user;

    //send error or if the token is invalid
    if(!refreshToken) return res.status(401).json("you are not authenticated");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY ,(err)=>{
        if(err){
            console.log(err);
        }
        
        refreshTokens=refreshTokens.filter((token)=> token!==refreshToken);

        const newAccessToken=jwt.sign({
            id: user.id, isAdmin: user.isAdmin}, 
            process.env.SECRET_KEY
            );
        
        const newRefreshToken=jwt.sign({
            id: user.id, isAdmin: user.isAdmin}, 
            process.env.REFRESH_SECRET_KEY,
            );

        refreshTokens.push(newRefreshToken);

        res.status(200).json({accessToken:newAccessToken, refreshToken: newRefreshToken});
    })
    //create new access token, refresh token and sent to user
})

//Login
router.post("/login",async (req,res)=>{
    try{
        //searching the user in database
        const user= await User.findOne({email: req.body.email});
        !user && res.status(404).send("user not found");

        const validPassword= await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("wrong password");

        const accessToken=jwt.sign({
            id: user.id, isAdmin: user.isAdmin}, 
            process.env.SECRET_KEY
            );

        const refreshToken=jwt.sign({
            id: user.id, isAdmin: user.isAdmin}, 
            process.env.REFRESH_SECRET_KEY,
            );

        refreshTokens.push(refreshToken);

        res.status(200).json({user,accessToken,refreshToken});
    }catch(error){
        res.status(500).json(error);
    }
})

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

//logout a user
router.post("/logout", verify ,(req,res)=>{
    const refreshToken=req.body.token;
    refreshTokens=refreshTokens.filter((token)=>token!==refreshToken);
    res.status(200).json("you are logged out");
})

module.exports= router;