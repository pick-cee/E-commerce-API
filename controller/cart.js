const Cart = require("../models/Cart");

const Create = async (request, response) => {
    const newCart = new Cart(request.body);

    try {
        const savedCart = await newCart.save();
        response.status(201).json({
            message: "Cart created successfully",
            Cart: savedCart,
        });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const updateCart = async (request, response) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );
        response
            .status(200)
            .json({ message: "Cart succcessfully updated", Cart: updatedCart });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const deleteCart = async (request, response) => {
    try {
        await Cart.findOneAndDelete(request.params.id);
        response
            .status(200)
            .json({ message: "Cart has been deleted succesfully" });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getCart = async (request, response) => {
    try {
        const cart = await Cart.find({ userId: request.params.userId });
        response.status(200).json({ message: "Records.....", Cart: cart });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getCarts = async (request, response) => {
    try {
        const cart = await Cart.find();
        response.status(200).json({ message: " All Records.....", Cart: cart });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

module.exports = {
    Create,
    updateCart,
    deleteCart,
    getCart,
    getCarts,
};
