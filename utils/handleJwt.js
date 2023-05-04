const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//Debo pasar el objeto del usuario
const tokenSing = async (user) => {
  //Firmar el token
  const sing = await jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sing;
};



//Debo pasar el token de session JWT
const verifyToken = async (tokenJwt) => {
   
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSing, verifyToken };
