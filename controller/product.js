const Product = require("../models/Product");

const Create = async (request, response) => {
    const newProduct = new Product(request.body);

    try {
        const savedProduct = await newProduct.save();
        response.status(201).json({
            message: "Product created successfully",
            Product: savedProduct,
        });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const updateProduct = async (request, response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            {
                $set: request.body,
            },
            { new: true }
        );
        response.status(200).json({
            message: "User succcessfully updated",
            Product: updatedProduct,
        });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const deleteProduct = async (request, response) => {
    try {
        await Product.findOneAndDelete(request.params.id);
        response
            .status(200)
            .json({ message: "Product has been deleted succesfully" });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getProduct = async (request, response) => {
    try {
        const product = await Product.findById(request.params.id);
        response
            .status(200)
            .json({ message: "Records.....", product: product });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

const getProducts = async (request, response) => {
    try {
        const product = await Product.find();
        response
            .status(200)
            .json({ message: " All Records.....", products: product });
    } catch (err) {
        response.status(500).json({ error: err });
    }
};

module.exports = {
    Create,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts,
};
