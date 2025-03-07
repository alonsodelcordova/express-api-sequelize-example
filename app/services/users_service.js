const { User, Token } = require("../models/users");
const crypto = require("crypto");


function encriptarPassword(password) {
  const hash256 = crypto.createHash("sha256");
  const newPass= hash256.update(password).digest("base64");
  return newPass;
}


function generarToken(username) {
  let user_key = username + Math.random().toString();
  return  crypto.createHash("sha256").update(user_key).digest("base64");
}


const getUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  });
};

const createUser = async (datos) => {
  try {
    const user = User.build(datos);
    user.set({ password: encriptarPassword(user.password) });
    const respuesta = await user.save();
    return {
      mensaje: "Usuario agregado",
      data: respuesta,
      isSuccess: true,
    };
  } catch (error) {
    var errors = error.errors.map((e) => e.message);
    return { errors, isSuccess: false};
  }
};

//----------- login ------------------------------
const inciarSesion = async (username, password, device) => {

  //obtener  usuario
  const user = await User.findOne({
    where: { name: username }
  });
  
  if (!user) {
    return {
      mensaje: "Usuario no encontrado",
      isSuccess: false,
    };
  }

  const passwordDesencrypt = encriptarPassword(password);
  if (passwordDesencrypt != user.password) {
    return {
      mensaje: "Contraseña incorrecta",
      isSuccess: false,
      password1: passwordDesencrypt,
      password2: user.password
    };
  }

  var token = await Token.findOne({
    where: { userId: user.id }
  });
  if (!token) {
    token = await Token.create({
      token: generarToken(username),
      userId: user.id,
      deviceId: device,
    });
  }
  return {
    mensaje: "Bienvenido",
    isSuccess: true,
    token: token.token,
    username: user.name,
    email: user.email,
  };
};

//----------- logout ------------------------------
const cerrarSesion = async (tokenSRC) => {
  const token = await Token.findOne({
    where: { token: tokenSRC }
  });
  if (!token) {
    return {
      mensaje: "Token no encontrado",
      isSuccess: false,
    };
  }
  await token.destroy();
  return {
    mensaje: "Sesión cerrada",
    isSuccess: true,
  };
};

module.exports = {
  getUsers,
  createUser,
  inciarSesion,
  cerrarSesion,
};
