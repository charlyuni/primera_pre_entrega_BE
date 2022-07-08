const { FILENAME_DATABASE } = require("../../constants");
const fs = require("fs");

module.exports = {

  /// Trae todos los productos

  getProducts: async (req, res) => {
    try {
      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      res.render("pages/datos.ejs",
      {data: JSON.parse(products)})
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },

  /// busca producto por ID

  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      if (!+id) throw new Error("Error. Proporcione un ID");

      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const product = JSON.parse(products).filter(product => product.id === +id);
      res.render("pages/datos.ejs",
      {data: product})
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },
  muestraFormulario: (req, res) => {
    console.log("muestraFormulario");
    res.render("form.ejs");
  },


  /// crea nuevo productos
  createProduct: async (req, res) => {

    try {
        const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
        const productsParsed = JSON.parse(products);

        const lastProduct = productsParsed.at(-1);
        const newProduct = {
          id: lastProduct.id + 1,
          ...req.body,}

        const allProducts = [...productsParsed, newProduct];
        await fs.promises.writeFile(
          FILENAME_DATABASE,
          JSON.stringify(allProducts),
          "utf-8"
        );
        res.redirect("api/productos")

    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },


  updateProduct: async (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    try {
      if (!+id) throw new Error("Error. Proporcione un ID");

      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const productsParsed = JSON.parse(products);

      const finded = productsParsed.find((item) => item.id === +id);

      if (finded) {
        const newProduct = {
          ...finded,
          ...req.body,
        };

        const allProducts = productsParsed.map((item) => {
          if (item.id === +id) return newProduct;
          return item;
        });

        await fs.promises.writeFile(
          FILENAME_DATABASE,
          JSON.stringify(allProducts),
          "utf-8"
        );

        res.json({ msg: `Producto  actualizado con exito` });
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      if (!+id) throw new Error("Error. Proporcione un ID");

      const products = await fs.promises.readFile(FILENAME_DATABASE, "utf-8");
      const dataFiltrada = JSON.parse(products).filter(item => item.id != id);


        await fs.promises.writeFile(
          FILENAME_DATABASE,
          JSON.stringify(dataFiltrada),
          "utf-8"
        );
      res.json({ msg: `Producto ${id} eliminado con exito` });

    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  }

};
