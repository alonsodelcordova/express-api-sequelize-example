const { Router } = require("express");
const { getProductos, crearProducto, saveImagenProducto } = require("../services/productos_service");

const router = Router();

router.get("/", (req, res) => {
  const data = getProductos();
  res.json({
    mensaje: "Exito",
    data,
  });
});

router.post("/", async (req, res) => {
  var datos = req.body;
  const respuesta = await crearProducto(datos);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});

router.post("/imagen/:id", async (req, res) => {
  const id = req.params.id;

  if (req.files && Object.keys(req.files).length !== 0) {
    const imagen = req.files.imagen
    console.log("nombre:"+imagen.name);
    imagen.mv(__dirname + `/public/images/${id}.jpg`, function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      mensaje: "Imagen guardada",
      msg: imagen.name
    })
  } else {
    res.status(400).json({
      mensaje: "No se ha enviado ninguna imagen",
      isSuccess: false,
    });
  }
});


module.exports = router;