const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try{
    const allUsers = await db.findUsers();
    res.json(allUsers);
  } catch(err) {
    res.json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const user = await db.getUser({ _id: req.params.id });
    res.json(user);
  } catch(err) {
    res.json({message: err});
  }
});

router.post('/', async (req, res, next) => {
  try{
    const newUser = {
      firstName: req.body.firstName,
      middleName: req.body.middleName || '',
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    };
    const savedUser = await db.createUser(newUser);
    res.json(savedUser);
  } catch(err) {
    res.json({message: err})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.deleteUser({ _id: req.params.id });
    res.json({message: "user removed!"});
  } catch(err) {
    res.json({message: err.message})
  }
});

router.patch('/:id', async(req, res) =>{
  try{
    const updatedUser = await db.updateUser({ _id: req.params.id },
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
