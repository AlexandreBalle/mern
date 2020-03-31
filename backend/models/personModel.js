import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

personSchema.pre('save', function (next) {
  let person = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(person.password, salt, (err, hash) => {
      person.password = hash;
      next();
    });
  });
});

export default mongoose.model('Person', personSchema);
