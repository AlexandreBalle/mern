import mongoose from 'mongoose';
import playerSchema from '../models/playerModel';

const Player = mongoose.model('Player', playerSchema);

export const add = (req, res) => {
  let newPlayer = new Player(req.body);
  newPlayer.save((err, createdPlayer) => {
    if (err) {
      res.send(err);
    }

    res.json(createdPlayer);
  });
};

export const update = (req, res) => {
  Player.updateOne({ _id: req.params.id }, req.body, err => {
    if (err) {
      res.send('an error occured while trying to get players');
    }

    res.send('Player #' + req.params.id + ' has been updated');
  });
};

export const remove = (req, res) => {
  Player.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.send('an error occured while trying to get players');
    }

    res.send('Player #' + req.params.id + ' removed');
  });
};

export const getAll = (req, res) => {
  Player.find({}, (err, players) => {
    if (err) {
      res.send('an error occured while trying to get players');
    }

    res.send(players);
  });
};

export const getOneById = (req, res) => {
  Player.findById(req.params.id, (err, players) => {
    if (err) {
      res.send('an error occured while trying to get players');
    }

    res.send(players);
  });
};
