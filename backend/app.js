import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Model
import User from './models/UserModel.js';

// Midilwares
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// Connecting to mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) =>
    app.listen(PORT, () =>
      console.log(`((: Server is running on port ${PORT} `)
    )
  )
  .catch((err) => console.log(err));

// ROUTES
// GET: test
app.get('/', (req, res) => res.send('API is running...'));

// GET: get all users
app.get('/users', async (req, res) => {
  try {
    let users = await User.find({});
    if (users) {
      res.send(users);
    }
  } catch (err) {
    console.log(err);
  }
});

// POST: create new user/ add user to db
app.post('/users', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'missing user input' });
  const users = await User.find();
  const userExists = users.some((user) => user.email === req.body.email);
  if (teamExists) {
    res.json({
      registrationStatus: 'failed',
      message: 'User with provided email already exists!',
    });
  } else {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.json({
        status: 'success',
        user: newUser,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// PUT: update user info based on id
app.put('/users', async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: 'missing user input' });
    // deconstucted userId from request body
    const { _id } = req.body;
    let update = req.body;
    // let user = await User.findById(id);
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
      { update },
      {
        new: true,
      }
    );

    res.json({ user: updatedUser });
  } catch (error) {
    console.log(error);
  }
});

// DELETE: Delete single user based on id
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id, function (err, user) {
      if (err) {
        console.log(err);
        res.json({ message: 'delete failed' });
      } else {
        console.log('Deleted : ', user);
      }
    });
    res.json({ message: 'car deleted' });
  } catch (err) {
    console.log(err);
    res.json({ message: 'delete failed' });
  }
});
