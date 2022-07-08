const { Router } = require("express");
const carritoController = require("../controlers/carrito.controller")

const ADMIN = true;

const isAdmin = (req, res, next) => {
    if (ADMIN) {
        next();
    } else {
        res.status(401).send("You are not authorized");
    }
}

const router = Router();
router.post("/", isAdmin ,carritoController.createCart);
router.delete("/:id", carritoController.deleteCart);
router.get("/:id", carritoController.getCart)
router.post("/:id/productos", carritoController.addProduct);
router.delete("/:id/productos/:idProduct", carritoController.deleteProduct);

module.exports = router;
