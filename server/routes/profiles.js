const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try{
    const allProfiles = await db.findProfiles();
    res.json(allProfiles);
  } catch(err) {
    res.json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const profile = await db.getProfile({ _id: req.params.id });
    res.json(profile);
  } catch(err) {
    res.json({message: err});
  }
});

router.post('/', async (req, res, next) => {
  try{
    const newProfile = {
      firstName: req.body.firstName,
      middleName: req.body.middleName || '',
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    };
    const savedProfile = await db.createProfile(newProfile);
    res.json(savedProfile);
  } catch(err) {
    res.json({message: err})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.deleteProfile({ _id: req.params.id });
    res.json({message: "Profile removed!"});
  } catch(err) {
    res.json({message: err.message})
  }
});

router.patch('/:id', async(req, res) =>{
  try{
    const updatedProfile = await db.updateProfile({ _id: req.params.id },
      {
        $set: req.body,
      });
    res.json(updatedProfile);
  }
  catch(err) {
    res.json({message: err.message})
  }
})

module.exports = router;
