const {
    Create,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts,
} = require("../controller/product");
const router = require("express").Router();
const {
    verifyToken,
    authorization,
    AdminAndAuthorization,
} = require("../lib/verifyToken");

router.post("/createProduct", AdminAndAuthorization, Create);
router.put("/updateProduct/:id", AdminAndAuthorization, updateProduct);
router.delete("/deleteProduct/:id", AdminAndAuthorization, deleteProduct);
router.get("/get/:id", getProduct);
router.get("/get/", getProducts);

module.exports = router;
