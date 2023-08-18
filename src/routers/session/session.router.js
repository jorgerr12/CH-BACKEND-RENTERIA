import { Router } from "express"

const router = Router()

router.post("/register", (req, res) => {

    if (req.session.user) {
        res.send("ya se encuentra logeado")
    }
        if (req.body.email && req.body.firstName && req.body.password) {
        const userRol = req.body.email.split("@")[1].includes("admin")?"admin": "usuario"

        req.session.user ={
            email: req.body.email,
            firstName: req.body.firstName,
            password: req.body.password,
            userRol:userRol
        }
        console.log(req.session.user)
        res.send({status:"success",message:"usuario registrado con exito"})
        }
        else{
            res.send({status:"error",message:"complete los datos necesarios"})
        }
    

})

router.post("/login",(req,res)=>{
    console.log("desde login")
    if (req.session.user) {
        res.send("ya se encuentra logeado")
    }
    if (req.body.email && req.body.password) {
        const userRol = req.body.email.split("@")[1].includes("admin")?"admin": "usuario"

        req.session.user ={
            email: req.body.email,
            firstName: req.body.firstName,
            password: req.body.password,
            userRol:userRol
        }
        res.send({status:"success",message:"usuario logeado con exito"})
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

export { router as sessionRouter }