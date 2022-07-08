const express = require("express");
const { PORT } = require("./constants");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.set('views','./views');
app.set('view engine', 'ejs');


//Controlers
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(express.static(path.join(__dirname, "public"))) */
app.use(express.static('./public'))
app.use("/API/productos", require("./src/routes/productos.routes"));
app.use("/API/carrito", require("./src/routes/carrito.routes"));



app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
