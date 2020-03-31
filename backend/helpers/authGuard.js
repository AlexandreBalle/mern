import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';

const ensureIsAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Token is missing');
  }

  const token = req.headers.authorization.split(' ')[1];
  let payload = null;

  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }

  if (payload.expiration <= moment().unix()) {
    res.status(401).send('Token expired');
  }

  Person.findById(payload.iss, (err, person) => {
    if (err) {
      return res.status(401).send('User not found');
    }

    req.userId = payload.iss;
    next();
  });
};

export default ensureIsAuthenticated;
