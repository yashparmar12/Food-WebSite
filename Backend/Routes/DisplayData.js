const express = require('express');
const DataBase = require('../db');
const router = express.Router();


router.post('/foodData', async (req, res) => {
    try {
        const data = await DataBase();
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});





// router.post('/foodData', (req,res)=>{
//     try{
//         res.send([global.food_items, global.foodCategory]);
        
//     }catch(err){
//         res.send("Server Error");
//     }
// });

module.exports = router;