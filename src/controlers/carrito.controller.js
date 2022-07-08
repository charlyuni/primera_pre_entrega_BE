const { FILENAME_CARRITOBASE } = require("../../constants");
const fs = require("fs");

module.exports = {


  createCart: async (req, res) => {
    try {
      const cart = await fs.promises.readFile(FILENAME_CARRITOBASE, "utf-8");
      const cartPrse = JSON.parse(cart);
      const cartPush = ({...req.body});
      const lastCart = cartPrse.at(-1)
      const timesstamp = new Date()
      const newCart = {
        id: lastCart.id + 1,
        timestamp: timesstamp,
        products: [cartPush],
        }
     
    const allCart = [...cartPrse, newCart];
    const newCartJson = JSON.stringify(allCart);
      await fs.promises.writeFile(FILENAME_CARRITOBASE, newCartJson);
      res.status(200).json({
        message: "Cart created",
        data: newCart
      });
      
      
      res.redirect("api/carrito")

  } catch (error) {
    res.json({ msg: `Error: ${error.message}` });
  } 
},

deleteCart: async (req, res) => {
  try {
    const cart = await fs.promises.readFile(FILENAME_CARRITOBASE, "utf-8")
    const cartPrse = JSON.parse(cart);
    const cartFilter = cartPrse.filter(cart => cart.id !== req.params.id);
    const newCartJson = JSON.stringify(cartFilter);
    await fs.promises.writeFile(FILENAME_CARRITOBASE, cartFilter);  
    res.status(200).json({
      message: "Cart deleted",
      data: cartFilter
    });
  } catch (error) {
    res.json({ msg: `Error: ${error.message}` });
  }
},

  


  /// Trae un carrito segun ID

  getCart: async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await fs.promises.readFile(FILENAME_CARRITOBASE, "utf-8");
      const cartPrse = JSON.parse(cart)
      cartPrse.forEach(cart => {
        if (cart.id == id) {
          products = cart.products;
          res.render("pages/carrito.ejs",
          {data: JSON.parse(JSON.stringify(products))})
        }})
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },

  /// busca producto por ID

  getProductById: async (req, res) => {
    const { id } = req.params;

    try {
      if (!+id) throw new Error("Error. Proporcione un ID");

      const products = await fs.promises.readFile(FILENAME_CARRITOBASE, "utf-8");
      const product = JSON.parse(products).filter(product => product.id === +id);
      res.render("pages/datos.ejs",
      {data: product})
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },

  /// incorpora producto en carrito


  addProduct: async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    try {
      if (!+id) throw new Error("Error. Proporcione un ID");
      if (!product) throw new Error("Error. Proporcione un producto");

      const cart = await fs.promises.readFile(FILENAME_CARRITOBASE, "utf-8");

      const cartPrse = JSON.parse(cart);
       cartPrse.forEach( async cart => {
        if (cart.id == id) {
          cart.products.push(product);
          const newCartJson = JSON.stringify(cartPrse);
          await fs.promises.writeFile(FILENAME_CARRITOBASE, newCartJson);
        }
      }
      );
      res.redirect("api/carrito")
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }
  },

  /// elimina producto de carrito
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const { idProduct } = req.params;
    console.log(id)
    console.log(idProduct)
    try {
      if (!+id) throw new Error("Error. Proporcione un ID");
      if (!+idProduct) throw new Error("Error. Proporcione un ID");

      const cart = await fs.promises.readFile(FILENAME_CARRITOBASE, "utf-8");
      const cartPrse = JSON.parse(cart);
      cartPrse.forEach( async cart => {
        if (cart.id == id) {
          cart.products.forEach( async product => {
            if (product.id == idProduct) {
              cart.products.splice(cart.products.indexOf(product), 1);
              const newCartJson = JSON.stringify(cartPrse);
              await fs.promises.writeFile(FILENAME_CARRITOBASE, newCartJson);
            }
          }
          );
        }
      }
      );
      res.redirect("api/carrito")
    } catch (error) {
      res.json({ msg: `Error: ${error.message}` });
    }  }



};
