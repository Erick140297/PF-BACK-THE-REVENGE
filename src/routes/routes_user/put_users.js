const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

// Para esta ruta es necesario poner el id del usuario exacto que queremos editar. "id".
// Siga correctamente el path para que no arroje errores el servidor.

router.put('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate( id, req.body)
        res.status(200).json({message: "User updated successfully"});

    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router