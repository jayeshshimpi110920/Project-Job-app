import express from "express"
import cors from "cors"
import mongoose from "mongoose";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    user_id :String,
    saved_jobs:Object,
    applied_job:Object,
    my_reviews:Object,
}, { minimize: false })

const User = new mongoose.model("User", userSchema)

app.get('/login', function(req, res) {
    User.find({}, function(err, users) {
       res.send( {users: users});
    });
});

app.post("/register", async(req, res)=> {
    const { email, password ,user_id, saved_jobs , applied_job , my_reviews } = req.body;    

    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {

            const user = new User({
                email,
                password,
                user_id,
                saved_jobs ,
                applied_job ,
                my_reviews 
            })

            

            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
}) 



app.patch("/users/saved_jobs", (req,res)=>{

    const {user_id , saved_jobs } = req.body;
    User.findOneAndUpdate({user_id:user_id},
        
    {   $set:{
        saved_jobs:saved_jobs
        }
    }
    )
    .then((res)=>{
        console.log("patch sucessfull");
    })
    .catch(err=> console.log("patch error"))

})


app.patch("/users/applied_jobs", (req,res)=>{

    const {user_id , saved_jobs , applied_job} = req.body;
    User.findOneAndUpdate({user_id:user_id},
        
    {   $set:{
        applied_job:applied_job
        }
    }
    )
    .then((res)=>{
        console.log("Applied job updated..!!!");
    })
    .catch(err=> console.log("Applied job Error..!!"))

})



app.listen(9002,() => {
    console.log("BE started at port 9002")
})