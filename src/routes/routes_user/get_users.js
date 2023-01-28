const { Router } = require("express");
const router = Router();
const User = require("../../models/user");

// Para esta ruta no es necesario añadir algún valor extra, ya que esta ruta trae todos los usuarios.

router.get('/users', async (req, res) => {
    const { email }   = req.query
    console.log(email);
    try {
        if(email===undefined){
            const users = await User.find({
                deleteLogic: false
            })/* .populate('shoppingcart'); */
            res.status(200).json(users);    
        }else{
            const user = await User.findOne({email})
            res.status(200).json(user);    
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router

