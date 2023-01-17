const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

router.post("/user", async (req, res) => {
    try {
        const {email, name} = req.body

        const findUser = await User.findOne({
            email
        })

        if (findUser === null) {
            const newUser = await User.create({email, name});
            const saveUser = await newUser.save();
            res.status(200).json(saveUser);
        } else {
            res.status(200).json(findUser); 
        }
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router