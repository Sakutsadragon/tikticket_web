const { aregister, alogin, addshow, updateSeats,getShow} = require("../controllers/adminController");
const router=require("express").Router();
router.post("/aregister",aregister);
router.post("/alogin",alogin);
router.post("/addshow",addshow);
router.post("/updateSeats",updateSeats);
router.get("/getSeats/:username/:id",getShow)



module.exports = router;
