const { Router } = require("express");
const { getUsers, createUser } = require("../services/users_service");
const router = Router();

router.get("/", async (req, res) => {
  const data = await getUsers();
  res.json({
    mensaje: "Exito",
    data,
  });
});

router.post("/", async (req, res) => {
  var datos = req.body;
  const respuesta = await createUser(datos);
  if (respuesta.isSuccess) {
    res.json(respuesta);
  } else {
    res.status(400).json(respuesta);
  }
});

module.exports = router;
