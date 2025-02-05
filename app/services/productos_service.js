const { Producto } = require("../models/productos");

const getProductos = async () => {
  return await Producto.findAll();
};

const crearProducto = async (datos) => {
  try {
    const producto = Producto.build(datos);
    producto.imagen = "";
    const respuesta = await Producto.create(datos);
    return {
      mensaje: "Producto agregado",
      data: respuesta,
      isSuccess: true,
    };
  } catch (error) {
    var errors = error.errors.map((e) => e.message);
    return {
      errors,
      isSuccess: false,
    };
  }
};

const saveImagenProducto = async (id, imagen) => {
  const producto = await Producto.findByPk(id);
  if (!producto) {
    return {
      mensaje: "Producto no encontrado",
      isSuccess: false,
    };
  }
  const imageFileName = `${id}.jpg`;
  const imagePath = `/public/images/${imageFileName}`;
  const url = __dirname + imagePath;
  console.log(url);
  const resp = await imagen.mv(url, (err) => {
    if (err) {
      return {
        mensaje: "Error al guardar la imagen",
        isSuccess: false,
      };
    } else {
    }
  });
  console.log(resp);
  try {
    producto.imagen = imagePath;
    await producto.save();
    return {
      mensaje: "Imagen guardada",
      isSuccess: true,
      url: imagePath,
    };
  } catch (error) {
    return {
      mensaje: "Error al guardar la imagen- catch",
      isSuccess: false,
      data: error,
    };
  }
};

module.exports = {
  getProductos,
  crearProducto,
  saveImagenProducto,
};
