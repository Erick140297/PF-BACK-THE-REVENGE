const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

// Para esta ruta no es necesario añadir algún valor extra, ya que esta ruta trae todos los usuarios.

router.get('/user', async (req, res) => {
    try {
        const users = await User.find({
            deleteLogic: false
        })/* .populate('shoppingcart'); */
        res.status(200).json(users);

    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router

