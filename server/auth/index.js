const jwt = require('jsonwebtoken');

const SECRET = process.env.TOKEN_SECRET;

const newToken = (id) => {
  const token = jwt.sign(id.toJSON(), SECRET);
  return token;
}

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if (!token) return res.sendStatus(401).end();
  if (jwt.verify(token, SECRET)) return next();
  return res.sendStatus(403).end();
}

module.exports = {
  newToken,
  authenticate,
}