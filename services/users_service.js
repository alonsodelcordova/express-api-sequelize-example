const { User, Token } = require("../models/users");

function encriptarPassword(password) {
  return password;
}

const getUsers = async () => {
  return await User.findAll();
};

const createUser = async (datos) => {
  try {
    const user = User.build(datos);
    user.password = encriptarPassword(user.password);
    const respuesta = await User.create(datos);
    return {
      mensaje: "Usuario agregado",
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

//----------- login ------------------------------
const inciarSesion = async (username, password) => {
  const user = await User.findOne({
    where: {
      name: username,
      password: encriptarPassword(password),
    },
  });
  if (!user) {
    return {
      mensaje: "Usuario no encontrado",
      isSuccess: false,
    };
  }
  var token = await Token.findOne({
    where: {
      userId: user.id,
    },
  });
  if (!token) {
    token = await Token.create({
      token: Math.random().toString(),
      userId: user.id,
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
    where: {
      token: tokenSRC,
    },
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
