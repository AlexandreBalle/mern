import mongoose from 'mongoose';
import messageSchema from '../models/messageModel';
import userSchema from '../models/userModel';

const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);

export const add = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    user = new User({ username: req.body.username });
  }

  let newMessage = new Message({ message: req.body.message });
  await newMessage.save();

  user.messages.push(newMessage);
  user = await user.save();

  res.send(newMessage);
};
