import { Router } from "express"
import { createHashValue, isValidPassword } from "../../utils.js";
import userModel from "../../dao/models/users.model.js";
import passport from "passport";

const router = Router()

router.post("/register",async (req, res) => {

    if (req.session.user) {
        res.send("ya se encuentra logeado")
    }
        if (req.body.email && req.body.firstName && req.body.password) {
        
          const passHashed = await createHashValue(req.body.password)
        const newUserData ={
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            username: req.body.userName,
            email: req.body.email, 
            password: passHashed,
        }

        const findUserEmail = await userModel.findOne({email:newUserData.email})

        if(findUserEmail){
          return res
            .status(409).json({ message: "username and/or email already exist" });
        }
        const newUser = await userModel.create(newUserData);
        req.session.user = { ...newUserData };
        res.send({status:"success",message:"usuario registrado con exito",user:newUser})
        }
        else{
            res.send({status:"error",message:"complete los datos necesarios"})
        }
    

});

router.post("/login", async (req,res)=>{
    if (req.session.user) {
        res.send("ya se encuentra logeado")
    }
    if (req.body.email && req.body.password) {
      const findEmail = await userModel.findOne({ email: req.body.email});
        
      if(!findEmail){
        res.send({status:"error",message:"Email no registrado"})
      }

      const isValidPass = await isValidPassword(req.body.password,findEmail.password)

      if(!isValidPass){
        res.send({status:"error",message:"Contraseña incorrecta"})
      }

      req.session.user ={
            ...findEmail,
            password:"",
        }
        res.send({status:"success",message:"usuario logeado con exito",user:req.session.user})
        }
        else{
            res.send({status:"error",message:"complete los datos necesarios"})
        }
})

router.get("/logout", (req, res) => {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.clearCookie("session1");
          res.redirect("/");
        }
      });
    } else {
      res.send("no se puede desloggear si no esta logeado");
    }
  });
router.get("/github",

passport.authenticate("github",{scope:["user:email"]})),
async(req,res)=>{
  console.log(` GITHUB Login Strategy`);
}

router.get("/githubcallback",
passport.authenticate("github",{failureRedirect:"/login"}),
async(req,res)=>{
  req.session.user = req.user;
  res.send({status:"success",message:"usuario logeado con exito",user:req.session.user})
}
)
export { router as sessionRouter }