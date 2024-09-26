const { register, login, availableShows, getHistory} = require("../controllers/userController");
const router=require("express").Router();
router.post("/register",register);
router.post("/login",login);
router.get("/availableShows",availableShows)
router.post("/getHistory",getHistory)

module.exports = router;
