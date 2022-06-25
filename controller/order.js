const Order = require("../models/Order");

const Create = async (request, response) => {
    const newOrder = new Order(request.body);

    try {
        const savedOrder = await newOrder.save();
        response.status(201).json({
            message: "Order created successfully",
            Order: savedOrder,
        });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const updateOrder = async (request, response) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );
        response.status(200).json({
            message: "Order succcessfully updated",
            Order: updatedOrder,
        });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const deleteOrder = async (request, response) => {
    try {
        await Order.findOneAndDelete(request.params.id);
        response
            .status(200)
            .json({ message: "Order has been deleted succesfully" });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getOrder = async (request, response) => {
    try {
        const order = await Order.find({ userId: request.params.userId });
        response.status(200).json({ message: "Records.....", Order: order });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getOrders = async (request, response) => {
    try {
        const order = await Order.find();
        response
            .status(200)
            .json({ message: " All Records.....", Order: order });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getMonthlyIncome = async (request, response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        response.status(200).json({ Income_details: income });
    } catch (err) {
        response.status(500).json(err);
    }
};

module.exports = {
    Create,
    updateOrder,
    deleteOrder,
    getOrder,
    getOrders,
    getMonthlyIncome,
};
