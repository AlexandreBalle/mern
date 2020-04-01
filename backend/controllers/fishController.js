import mongoose from 'mongoose';
import fishSchema from '../models/fishModel';

const Fish = mongoose.model('Fish', fishSchema);

export const addOne = (req, res) => {
  let fish = new Fish(req.body);
  fish.save((err, newFish) => {
    if (err) {
      res.send('An error occured while trying to create fish');
    }

    res.json(newFish);
  });
};

export const updateOne = (req, res) => {
  Fish.updateOne({ _id: req.params.id }, req.body, err => {
    if (err) {
      res.send('An error occured while trying to update fish');
    }

    res.send('Updated with success');
  });
};

export const removeOne = (req, res) => {
  Fish.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.send('An error occured while trying to remove fish');
    }

    res.send('Removed with success');
  });
};

export const getAll = async (req, res) => {
  const fishes = await Fish.find();

  res.send(fishes);
};

export const getOneById = (req, res) => {
  Fish.findById(req.params.id, (err, fish) => {
    if (err) {
      res.send('An error occured while trying to get fish');
    }

    res.send(fish);
  });
};
