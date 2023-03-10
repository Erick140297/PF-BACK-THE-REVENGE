const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

// Para esta ruta es necesario poner el id del usuario exacto que queremos traer. "id".
// Siga correctamente el path para que no arroje errores el servidor.

router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await User.findById({
            _id: id
        })/* .populate("shoppingCart"); */
        res.status(200).json(userById);

    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router

