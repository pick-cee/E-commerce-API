const router = require("express").Router();
const Orders = require("../models/Order");
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
require("dotenv").config();
const {
    verifyToken,
    authorization,
    AdminAndAuthorization,
} = require("../lib/verifyToken");

router.post("/initialize/:id", authorization, async (request, response) => {
    const order = await Orders.findById({ _id: request.params.id });
    const orderAmount = order.amount * 100;
    const orderEmail = request.body.email;
    const orderName = request.body.name;
    try {
        const init = await paystack.transaction.initialize({
            key: process.env.PAYSTACK_SECRET_KEY,
            amount: orderAmount,
            email: orderEmail,
            name: orderName,
            reference: Math.random(100, 20000),
        });
        response.status(200).json({ message: "Success", Data: init });
    } catch (e) {
        response.status(500).json({ message: "Some error occured...", err: e });
    }
    return;
});

router.get("/verify", authorization, async (request, response) => {
    const ref = request.body.reference;
    try {
        const verify = await paystack.transaction.verify(ref);
        response.status(200).json({ message: "Success", Data: verify });
    } catch (e) {
        response.status(500).json({ message: "Some error occured...", err: e });
    }
    return;
});

module.exports = router;
