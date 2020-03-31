import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';

export const signUp = async (req, res) => {
  let newPerson = new Person(req.body);
  let createdPerson = await newPerson.save();

  res.json(createdPerson);
};

export const login = async (req, res) => {
  let person = await Person.findOne({ email: req.body.email });

  if (!person) {
    return res.send('This user does not exist !');
  }

  const password = req.body.password;
  bcrypt.compare(password, person.password, (error, success) => {
    if (success) {
      const payload = {
        exp: moment().add(1, 'hour').unix(),
        iat: moment().unix(),
        iss: person.id
      };

      let token = jwt.encode(payload, process.env.TOKEN_SECRET);

      res.json({
        firstName: person.firstName,
        lastName: person.lastName,
        token: `Bearer ${token}`,
        expiration: moment().add(1, 'hour').format('YYYY mm dd HH ii')
      });
    }

    res.send('This password is invalid !');
  });
};
