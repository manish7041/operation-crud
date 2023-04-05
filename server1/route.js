const route = require("express").Router();
const userModule = require("./module")
const { registerValidation, loginValidation } = require("./validation")
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

route.post("/register", async (req, res) => {
    // data validation
    const { error } = registerValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // email validation
    const emailExist = await userModule.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("email is already exist");

    // password encryption
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModule({
        name: req.body.name,
        email: req.body.email,
        password:hashPassword,
        mobile: req.body.mobile
    })

    try {
        const SaveData = await newUser.save()
        res.send(SaveData)
    } catch (error) {
    }
})

route.post("/login",async(req,res)=>{
    // login validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // email validation
    const userExist = await userModule.findOne({email:req.body.email});
    if(!userExist) return res.status(400).send("email is not exist");

    // password validation
    const isPass = await bcrypt.compare(req.body.password,userExist.password)
    if(!isPass) return res.status(400).send('password is not correct')

    const token = jwt.sign({_id: userExist._id,name:userExist.name}, process.env.Token_secret)
  

    res.send('login successfully');
})

route.get("/showData",async(req,res)=>{
    try {
        const showData = await userModule.find()
        res.send(showData)
    } catch (error) {
        console.log(error);
    }
})

// Delete Data

route.delete('/delete',async(req,res)=>{
    let id = req.query.id;
    try {
        const deleteData = await userModule.findByIdAndDelete(id)
        res.send("Delete Data Successfully")
    } catch (error) {
        console.log(error);
    }
})

// Update data

route.post("/update",async(req,res)=>{
    _id = req.body._id
    try {
        const updateData = await userModule.findByIdAndUpdate(_id, req.body)
        res.send("update data succesfully")
    } catch (error) {
        console.log(error);
    }
})

route.get("/showOne", async(req,res)=>{
    const id = req.query.id
    try {
       const showOne = await userModule.findById(id)
       res.send(showOne)
    } catch (error) {
        console.log(error);
    }
});

module.exports = route;