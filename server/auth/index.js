const jwt = require('jsonwebtoken');
const db = require('../db');

const SECRET = process.env.TOKEN_SECRET;

const newToken = async id => {
  const token = await jwt.sign(id.toJSON(), SECRET);
  return token;
}

const authenticate = async (req, res, next) => {
  const authToken = req.headers['authorization'];
  console.log(authToken, await db.users.getUser({authToken}));
  if (!authToken) return res.sendStatus(401).end();
  if (jwt.verify(authToken, SECRET)) {
    const currentUser = await db.users.getUser({authToken});
    if (!currentUser) return res.status(401).end();
    req.user_id = currentUser._id;
    return next();
  }
  return res.sendStatus(403).end();
}

module.exports = {
  newToken,
  authenticate,
}