
module.exports = (req, res, next) => {
  if (req.body.name === undefined || req.body.email === undefined || req.body.password === undefined) {
    return res.status(403).send('user params is empty');
  }
  return next();
};
