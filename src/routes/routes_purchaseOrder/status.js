const { Router } = require("express");
const router = Router();
const User = require("../../models/user");
const PurchaseOrder = require("../../models/purchaseOrder");
const sendMail = require("../../utils/nodemailer");
const pConfirmation = require("../../TemplatesHtml/purchaseConfirmation.js");
const  pCompleted  = require('../../TemplatesHtml/purchaseCompleted');
const pSended = require('../../TemplatesHtml/purchaseSended');
const pInProgress = require("../../TemplatesHtml/purchaseInProgrese")
// const  pInProgress  = require('../../TemplatesHtml/purchaseInProgrese');

router.post("/order/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(req.body)
    const user = await User.findById(id)
    const order = await PurchaseOrder.findByOne({ user: id })

    let contentHtml;

    switch (status) {
        case "pendiente":
          contentHtml = pInProgress;
          break;
        case "pagado":
          contentHtml = pConfirmation;
          break;
        case "enviado":
          contentHtml = pSended;
          break;
        case "entregado":
          contentHtml = pCompleted;
          break;
    }
    await PurchaseOrder.updateOne({ _id: order._id }, { $set: { status: status }});
    await sendMail(contentHtml, user.email);
    res.status(200).json("Mail Enviado");
  } catch (error) {
    res.status(404).json(console.log(error));
  }
});

module.exports = router;

// const { Router } = require("express");
// const router = Router();
// const PurchaseOrder = require("../../models/purchaseOrder");
// const User = require("../../models/user");
// const sendMail = require("../../utils/nodemailer");
// const { pConfirmation } = require("../../TemplatesHtml/purchaseConfirmation.js");
// const { pCompleted } = require('../../TemplatesHtml/purchaseCompleted');
// const { pSended } = require('../../TemplatesHtml/purchaseSended');
// const { pInProgress } = require('../../TemplatesHtml/purchaseInprogrese');

// router.put("/order/status/:id", async (req, res) => {
// try {
// const { id } = req.params;
// const { status } = req.body;
// const order2 = await PurchaseOrder.findByIdAndUpdate(id, { status }, { new: true }).populate("user");
// const user = await User.findById(order2[0].user._id);


// let contentHtml;
// let subject;

// switch (status) {
//     case "pendiente":
//       contentHtml = pInProgress();
//       subject = "Tu pago esta procesandose";
//       break;
//     case "pagado":
//       contentHtml = pConfirmation();
//       subject = "Tu compra ha sido confirmada";
//       break;
//     case "enviado":
//       contentHtml = pSended();
//       subject = "Tu compra está en camino";
//       break;
//     case "entregado":
//       contentHtml = pCompleted();
//       subject = "Tu compra ha sido entregada";
//       break;
// }

// await sendMail(contentHtml, user.email);
// res.status(200).json("mail enviado");

// } catch (error) {
// res.status(404).json(console.log(error));
// }
// });

// module.exports = router;