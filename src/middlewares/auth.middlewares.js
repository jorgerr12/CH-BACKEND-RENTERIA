const auth = (req, res, next) => {
    if (req.session.user) {
      return next();
    } else {
      res.redirect("/login")
    }
  };

  export default auth