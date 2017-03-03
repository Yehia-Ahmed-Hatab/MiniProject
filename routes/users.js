const express =require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Portfolio=require('../models/portfolio')
const Work =require('../models/work');

//register
router.post('/register', (req,res,next)=>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    User.addUser(newUser,(err,user)=>{
        if(err){
            res.json({success: false,msg:'failed to register user'})
        }else{
             res.json({success: true,msg:'user registered'})

        }
    } )
});
// Authenticate
router.post('/authenticate', (req,res,next)=>{
    const username =req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if(err)throw err;
        if(!user){
            return res.json({success: false, msg:'User not found'})
        }
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err)throw err;
            if(isMatch){
                const token =jwt.sign(user, config.secret,{
                    expiresIn: 6064800 //1 week
                });
                res.json({
                    success: true,
                    token:'JWT '+token,
                    user:{
                        id:user._id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            } else{
                   return res.json({success: false, msg:'wrong password'})
            }
        });
    });
});
//myprofile
router.get('/myprofile',passport.authenticate('jwt',{session:false}), (req,res,next)=>{
    res.json({user:req.user}); //7ot zorar fe my profile redirect le my porfolio w add work hateb2a henak
});
//view my work and add to it
router.get('/portfolio',passport.authenticate('jwt',{session:false}), (req,res,next)=>{
   Work.getWorkByUsername(req.user.username);
   res.json({work:Work});
});
//create a portfolio
router.post('/createportfolio',passport.authenticate('jwt',{session:false}), (req,res,next)=>{
   
   let newPortfolio = new Portfolio({
                name: req.user.name,
    });
    Portfolio.addPortfolio(newPortfolio,(err,Portfolio)=>{
        if(err){
            res.json({success: false,msg:'failed to create portfolio'})
        }else{
             res.json({success: true,msg:'porfolio created'})

        }
    } )



});


//explore
router.get('/explore',(req,res,next)=>{
    res.send('look at all of this porfolios')
})

module.exports = router;