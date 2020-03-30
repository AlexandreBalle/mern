import mongoose from 'mongoose';
import userSchema from '../models/userModel';

const User = mongoose.model('User', userSchema);

export const getAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send('an error occured while trying to get users');
    }

    res.send(users);
  }).populate('messages');
};
