const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token ausente" });

  try {
    const { data } = await axios.post(`${process.env.AUTH_SERVICE_URL}`, { token });
    req.user = data;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
};
