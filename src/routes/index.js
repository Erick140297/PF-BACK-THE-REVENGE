const { Router } = require("express");
const router = Router();

//Home
router.get("/", async (req, res) => {
    try {
    res.status(200).send("Back deployado");
    } catch (error) {
    res.status(400).json(error);
    }
})

//UserRoutes
const post_user = require('./routes_user/post_users');
const get_user = require('./routes_user/get_users');
const get_userById = require('./routes_user/get_userById');
const put_user = require('./routes_user/put_users');
const delete_user = require('./routes_user/delete_users');

router.use(post_user);
router.use(get_user);
router.use(get_userById);
router.use(put_user);
router.use(delete_user);

//ShoppingCart_Routes
const post_shoppingCart = require('./routes_shoppingCart/post_shoppingCart');

router.use(post_shoppingCart);


module.exports = router
