const {
    Create,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrder,
    getMonthlyIncome,
} = require("../controller/order");
const router = require("express").Router();
const {
    verifyToken,
    authorization,
    AdminAndAuthorization,
} = require("../lib/verifyToken");
const Order = require("../models/Order");

router.post("/createOrder", verifyToken, Create);
router.put("/updateOrder/:id", authorization, updateOrder);
router.delete("/deleteOrder/:id", authorization, deleteOrder);
router.get("/get/:userId", authorization, getOrder);
router.get("/get", AdminAndAuthorization, getOrders);
router.get("/income", AdminAndAuthorization, getMonthlyIncome);

module.exports = router;
