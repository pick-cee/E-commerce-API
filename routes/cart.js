const {
    Create,
    updateCart,
    deleteCart,
    getCart,
    getCarts,
} = require("../controller/cart");
const router = require("express").Router();
const {
    verifyToken,
    authorization,
    AdminAndAuthorization,
} = require("../lib/verifyToken");

router.post("/createCart", verifyToken, Create);
router.put("/updateCart/:id", authorization, updateCart);
router.delete("/deleteCart/:id", authorization, deleteCart);
router.get("/get/:userId", authorization, getCart);
router.get("/get", AdminAndAuthorization, getCarts);

module.exports = router;
