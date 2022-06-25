const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Db Connection Successful");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT;

app.get("/", (request, response) => {
    response.send("Welcome to the home page of the API");
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/paystack", paymentRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
