const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

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