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

module.exports = router
