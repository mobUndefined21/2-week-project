const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, newToken } = require('../auth');

router.post('/newUser', async (req, res, next) => {
  try{
    const { firstName, lastName, password, email } = req.body;
    const newUser = { firstName, lastName, password, email };
    const savedUser = await db.users.createUser(newUser);
    await db.profiles.createProfile({ name: `${firstName} ${lastName}`, description: `hello my name is ${firstName} ${lastName}`, user: savedUser });
    res.status(201).end();
  } catch(err) {
    res.status(400).json({message: err.message});
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.users.getUser({ email });
    if (user.password === password) {
      const authToken = newToken(user._id);
      await db.users.updateUser({ email }, { authToken });
      console.log(user._id);
      const profile = await db.profiles.getProfile({ user: {_id: user._id }});
      console.log(profile);
      res.status(200).json({ authToken, profileId: profile._id }).end();
    }
  } catch(err) {
    console.log(err.message);
    res.status(400).json({ message: err.message })
  }
});

router.patch('/logout', async (req, res, next) => {
  try {
    const authToken = req.get('authorization'); 
    const user = await db.users.getUser({ authToken });
    await db.users.updateUser({ _id: user._id }, { authToken: '' })
    res.status(200).json({ message: 'Signed out' });
  } catch(err) {
    console.log(err.message);
    res.status(400).json({ message: err.message })
  }
});

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try{
    const allUsers = await db.users.findUsers();
    res.json(allUsers);
  } catch(err) {
    res.json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await db.users.getUser({ _id: req.params.id });
    res.json(user);
  } catch(err) {
    res.json({message: err});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await db.users.getUser({ _id: req.params.id });
    const profile = await db.profiles.findProfiles({user});
    await db.profiles.deleteProfile({ _id: profile._id });
    await db.users.deleteUser({ _id: user._id });
    res.json({ message: "user removed!" });
  } catch(err) {
    res.json({message: err.message})
  }
});

router.patch('/:id', async(req, res) =>{
  try {
    const updatedUser = await db.users.updateUser({ _id: req.params.id },
      {
        $set: req.body,
      });
    res.json(updatedUser);
  }
  catch(err) {
    res.json({message: err.message})
  }
})

module.exports = router;
