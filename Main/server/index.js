import express from "express"
import cors from "cors"
import mongoose from "mongoose"

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



app.post("/register", (req, res)=> {
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

app.patch("http://localhost:9002/user",(req,res)=>{

    const uu = User.find(user => user.user_id == ("dc3f9c56-e548-4df5-b497-0c9c08a6be6e"));

    if (!uu) return res.status(404).json({ message: 'Not Found' });

    uu.saved_jobs = req.body.saved_jobs;

    res.json(uu);
})



app.listen(9002,() => {
    console.log("BE started at port 9002")
})