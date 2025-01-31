const { Router } = require("express");
const { inciarSesion, cerrarSesion } = require("../services/users_service");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    mensaje: "Hola mundo",
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      mensaje: "Faltan datos",
    });
  }
  const respuesta = await inciarSesion(username, password);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});

router.post("/logout", async (req, res) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(400).json({
      mensaje: "Falta token",
    });
  }
  const tokenSRC = header.split(" ")[1];
  const respuesta = await cerrarSesion(tokenSRC);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});



module.exports = router;
