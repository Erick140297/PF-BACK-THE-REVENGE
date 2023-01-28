const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const sendMail = require("../../utils/nodemailer");

// Para esta ruta es necesario poner el "email" y "name" del usuario exacto que queremos crear.
// Para tener encuenta que estos dos valores se enviarán por el body del documento.

router.post("/user", async (req, res) => {
  try {
    const { email, name } = req.body;

    const findUser = await User.findOne({
      email,
    });

    if (findUser === null) {
      const newUser = await User.create({ email, name });
      const saveUser = await newUser.save();
      const contentHtml = `
        <h1>Bienvenid@ a Galaxia Tech</h1>
        <br/><br/>
        <h1>Galaxia Tech, el lugar ideal para comprar los mejores componentes de PC y más... </h1>
      `;
      await sendMail(contentHtml, email);
      res.status(200).json(saveUser);
    } else {
      res.status(200).json(findUser);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
