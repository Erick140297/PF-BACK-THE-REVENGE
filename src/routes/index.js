const { Router } = require("express");
const router = Router();

//Home
router.get("/", async (req, res) => {
  try {
    res.status(200).send("Back deployado");
  } catch (error) {
    res.status(400).json(error);
  }
});

//User_Routes
const post_user = require("./routes_user/post_users");
const get_user = require("./routes_user/get_users");
const get_userById = require("./routes_user/get_userById");
const put_user = require("./routes_user/put_users");
const delete_user = require("./routes_user/delete_users");

router.use(post_user);
router.use(get_user);
router.use(get_userById);
router.use(put_user);
router.use(delete_user);

//ShoppingCart_Routes
const post_shoppingCart = require("./routes_shoppingCart/post_shoppingCart");
const get_shoppingCart = require("./routes_shoppingCart/get_shoppingCart");
const delete_shoppingCart = require("./routes_shoppingCart/delete_shoppingCart");
const put_shoppingCart = require("./routes_shoppingCart/put_shoppingCart");

router.use(post_shoppingCart);
router.use(get_shoppingCart);
router.use(delete_shoppingCart);
router.use(put_shoppingCart);

//PurchaseOrder_Routes
const post_purchaseOrder = require("./routes_purchaseOrder/post_purchaseOrder");
const get_purchaseOrders = require("./routes_purchaseOrder/get_purchaseOrders");
const get_purchaseOrderById = require("./routes_purchaseOrder/get_purchaseOrderById");
const put_purchaseOrder = require("./routes_purchaseOrder/put_purchaseOrder")
const delete_purchaseOrder = require("./routes_purchaseOrder/delete_purchaseOrder")
const status = require("./routes_purchaseOrder/status")
const revised = require("./routes_purchaseOrder/revised")

router.use(post_purchaseOrder);
router.use(get_purchaseOrders);
router.use(get_purchaseOrderById);
router.use(put_purchaseOrder);
router.use(delete_purchaseOrder);
router.use(status)
router.use(revised)

//Products_Routes
const post_product = require("../routes/routes_product/post_product")
const get_products = require("../routes/routes_product/get_products")
const get_productById = require("../routes/routes_product/get_productById")
const put_product = require("../routes/routes_product/put_product")
const put_productImage = require("../routes/routes_product/put_productImage")
const delete_product = require("../routes/routes_product/delete_product")
// const update_products = require("../routes/routes_product/update_products")
const stock = require("./routes_product/stock")
const logic_stock = require("./routes_product/logic_stock")
const reviews = require("./routes_product/reviews")

router.use(post_product)
router.use(get_products)
router.use(get_productById)
router.use(put_product)
router.use(put_productImage)
router.use(delete_product)
// router.use(update_products)
router.use(stock)
router.use(logic_stock)
router.use(reviews)


//Payment
const paymentRoutes = require("./payment/payment.routes");

router.use(paymentRoutes);


module.exports = router;
