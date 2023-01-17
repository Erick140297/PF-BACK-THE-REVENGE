const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

router.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params;
        const user = await User.findByIdAndDelete(id);
        const userDeleted = await User.findById(id);

        userDeleted.length === 0 ? res.status(200).json("User deleted succesfully!") : res.status(404).json("User not found to deleted!");   
    } catch (error) {
        res.status(404).json(error);
    }
})