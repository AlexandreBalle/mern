import { Schema } from 'mongoose';

const messageSchema = new Schema({
  message: {
    type: String,
    default: ''
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default messageSchema;
