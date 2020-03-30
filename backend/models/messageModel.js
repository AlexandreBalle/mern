import { Schema } from 'mongoose';

const messageSchema = new Schema({
  message: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    ref: 'User'
  }
});

export default messageSchema;
