const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {

    const emailValid = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailValid) return res.status(400).send("este usuario ya existe");
    
    //se encripta la constrasena
    const salt = await bcrypt.genSalt(10);

    const hashPass = await bcrypt.hash(req.body.pass, salt);

    //se crea el usuario
    const user = await User.create({
      email: req.body.email,
      pass: hashPass,
      username: req.body.username,
    });

    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    
    if (!user){
      return res.status(400).send("usuario o contrasena equivocada");
    } 
    const validPass = await bcrypt.compare(req.body.pass, user.pass);
    
    if (!validPass){
      return res.status(400).send("usuario o contrasena equivocada");
    }
  
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    console.log(token)
    return res.header("auth-token", token).send({"authtoken":token, "id": user.id, "email":user.email});

  }catch (error) {
    return res.status(400).send(error);
  } 
});

router.get("/:token", async (req, resp) => {

  try{
      
      const result = jwt.verify(req.params["token"],process.env.SECRET_TOKEN)
      
      const userGot = await User.findOne({where:{
        id : result["id"]
      }});

      if( userGot.email === "admin@bebeymami.cl" ){
        resp.send("True")
      }

      resp.send("False")
      
      

  }catch(error){
      resp.status(400).send("Error 400");
  }
  
});

module.exports = router;