const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

router.delete('/user/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);
        const userDeleted = await User.findById(id);

        userDeleted
        ? res.status(404).json({message: "User not found to deleted!"}) 
        : res.status(200).json({message: "User deleted succesfully!"});
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router