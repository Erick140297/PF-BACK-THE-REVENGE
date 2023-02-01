const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const sendMail = require("../../utils/nodemailer");

router.post("/order/status/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)

    const contentHtml = `
    <h1>Te saluda Galaxia Tech</h1>
    <br/><br/>
    <h1>Te informamos que tu compra esta en camino</h1>
  `;
  await sendMail(contentHtml, user.email);
  res.status(200).json("mail enviado");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
