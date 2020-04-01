import { Schema } from 'mongoose';

const fishSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  }
});

export default fishSchema;
