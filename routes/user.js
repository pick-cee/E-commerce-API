const {
    Register,
    Login,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
} = require("../controller/user");
const router = require("express").Router();
const {
    verifyToken,
    authorization,
    AdminAndAuthorization,
} = require("../lib/verifyToken");

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authorization, updateUser);
router.delete("/delete/:id", authorization, deleteUser);
router.get("/get/:id", authorization, getUser);
router.get("/get", AdminAndAuthorization, getUsers);

module.exports = router;
