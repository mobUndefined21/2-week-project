const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, newToken } = require('../auth');

router.post('/newUser', async (req, res, next) => {
  try{
    const newUser = {
      firstName: req.body.firstName,
      middleName: req.body.middleName || '',
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    };
    const savedUser = await db.users.createUser(newUser);
    const authToken = newToken(savedUser.id);
    console.log({savedUser, authToken})
    res.json({savedUser, authToken});
  } catch(err) {
    res.json({message: err.message})
  }
});

router.post('/login', async (req, res, next) => {
  try{
    const login = {
      email: req.body.email,
      password: req.body.password,
    };
    const user = db.users.getUser({ email: req.body.email });
    if (user.password === req.body.password) {
      const authToken = newToken(user.id);
      res.json({ authToken });
    }

  } catch(err) {
    res.json({ message: err.message })
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
  try{
    const user = await db.users.getUser({ _id: req.params.id });
    res.json(user);
  } catch(err) {
    res.json({message: err});
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await db.users.deleteUser({ _id: req.params.id });
    res.json({message: "user removed!"});
  } catch(err) {
    res.json({message: err.message})
  }
});

router.patch('/:id', async(req, res) =>{
  try{
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
