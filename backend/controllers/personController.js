import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import moment from 'moment';
import Person from '../models/personModel';

export const signUp = async (req, res) => {
  let person = await Person.findOne({ email: req.body.email });

  if (person) {
    return res.send('This email is already used !');
  }

  let newPerson = new Person(req.body);
  let createdPerson = await newPerson.save();

  res.json(createdPerson);
};

export const login = async (req, res) => {
  let person = await Person.findOne({ email: req.body.email });

  if (!person) {
    return res.send('This user does not exist !');
  }

  bcrypt.compare(req.body.password, person.password, (error, success) => {
    if (success) {
      const payload = {
        exp: moment().add(1, 'hour').unix(),
        iat: moment().unix(),
        iss: person.id
      };

      let token = jwt.encode(payload, process.env.TOKEN_SECRET);

      return res.json({
        firstName: person.firstName,
        lastName: person.lastName,
        token: `Bearer ${token}`,
        expiration: moment().add(1, 'hour').format('d/mm/YYYY H:m')
      });
    }

    res.send('This password is invalid !');
  });
};
