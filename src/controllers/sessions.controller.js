
import { createHashValue, isValidPassword } from "../utils.js";
import userModel from "../dao/models/users.model.js";
import passport from "passport";
import UserPasswordModel from "../dao/models/userPassword.model.js";
import bcrypt from 'bcryptjs'
export class SessionController {

  static async register(req, res, next) {
    if (req.session.user) {
      res.send("ya se encuentra logeado")
    }
    if (req.body.email && req.body.firstName && req.body.password) {

      const passHashed = await createHashValue(req.body.password)
      const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        username: req.body.userName,
        email: req.body.email,
        password: passHashed,
      }

      const findUserEmail = await userModel.findOne({ email: newUserData.email })

      if (findUserEmail) {
        return res
          .status(409).json({ message: "username and/or email already exist" });
      }
      const newUser = await userModel.create(newUserData);
      req.session.user = { ...newUserData };
      res.send({ status: "success", message: "usuario registrado con exito", user: newUser })
    }
    else {
      res.send({ status: "error", message: "complete los datos necesarios" })
    }
  }

  static async login(req, res, next) {
    if (req.session.user) {
      res.send("ya se encuentra logeado")
    }
    if (req.body.email && req.body.password) {
      const findEmail = await userModel.findOne({ email: req.body.email });

      if (!findEmail) {
        res.send({ status: "error", message: "Email no registrado" })
      }

      const isValidPass = await isValidPassword(req.body.password, findEmail.password)

      if (!isValidPass) {
        res.send({ status: "error", message: "Contraseña incorrecta" })
      }

      req.session.user = {
        ...findEmail,
        password: "",
      }
      res.send({ status: "success", message: "usuario logeado con exito", user: req.session.user })
    }
    else {
      res.send({ status: "error", message: "complete los datos necesarios" })
    }

  }

  static async logout(req, res) {
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
  }

  static async github(req, res) {
    try {
      passport.authenticate("github", { scope: ["user:email"] })(req, res);
    } catch (error) {
      console.log("error:", error)
    }
  }

  static async githubcallback(req, res) {
    try {
      passport.authenticate("github", { failureRedirect: "/login" })(
        req,
        res,
        () => {
          console.log(
            `Using ENDPOINT of github/callback to communicate`
          );
          req.session.user = req.user;
          res.send({ status: "success", message: "usuario logeado con exito", user: req.session.user })
        }
      );
    } catch (error) {
      console.log("🚀 ~ file: users.repository.js:110 ~ sessionServiceDao ~ githubCallback= ~ error:", error)
    }
  }

  static async verifyToken(req, res) {
    const token = req.params.token
    const userPassword = await UserPasswordModel.findOne({ token })
    if (!userPassword) {
      // return res.status(404).json({ status: 'error', error: 'Token no válido / El token ha expirado' })
      return res.redirect('/forget-password');
    }
    const user = userPassword.email
    res.render('reset-password', {layout: false, user })
  }

  static async resetPassword(req,res){
    
    try {
      const email = req.params.user;
      const user = await userModel.findOne({email})
      const newPassword = req.body.newPassword;
      const passMatch = await bcrypt.compareSync(newPassword, user.password);
      if (passMatch) {
        return res.json({ status: 'error', message: 'No puedes usar la misma contraseña' });
      }
      const password = await createHashValue(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password });
      res.json({ status: 'success', message: 'Se ha creado una nueva contraseña' })
    await UserPasswordModel.deleteOne({ email: req.params.user })
    } catch (error) {
      res.json({ status: 'error', message: `No se ha podido crear la nueva contraseña: ${error}` })
    }

  }
}