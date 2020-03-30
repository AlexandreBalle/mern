import mongoose from 'mongoose';
import messageSchema from '../models/messageModel';
import userSchema from '../models/userModel';

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);

export const add = (req, res) => {
  User.findOne({ username: req.body.username }, (err, player) => {
    if (err) {
      res.send(err);
    }

    let user = !player ? new User({ username: req.body.username }) : player;
    let newMessage = new Message(req.body);

    newMessage.save(err => {
      if (err) {
        res.send(err);
      }

      user.messages.push(newMessage);
      user.save(err => {
        if (err) {
          res.send(err);
        }

        res.send(newMessage);
      });
    });
  });
};
