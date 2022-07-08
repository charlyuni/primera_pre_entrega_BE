const { Router } = require("express");
const productsController = require("../controlers/productos.controller")
const router = Router();
const ADMIN = true;

const isAdmin = (req, res, next) => {
    if (ADMIN) {
        next();
    } else {
        res.status(401).send("You are not authorized");
    }
}

router.get("/",isAdmin , productsController.getProducts);
router.get("/:id",isAdmin, productsController.getProductById);
router.get("/form",isAdmin,  productsController.muestraFormulario);
router.post("/form",isAdmin, productsController.createProduct);
router.put("/update/:id",isAdmin, productsController.updateProduct);
router.delete("/delete/:id",isAdmin, productsController.deleteProduct);

module.exports = router;
