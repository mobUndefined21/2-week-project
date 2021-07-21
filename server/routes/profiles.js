const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try{
    const allProfiles = await db.profiles.findProfiles();
    res.json(allProfiles);
  } catch(err) {
    res.json({ message: err.message });
  }
});

router.get('/:id', async (req, res, next) => {
  try{
    const profile = await db.profiles.getProfile({ _id: req.params.id });
    res.json(profile);
  } catch(err) {
    res.json({message: err});
  }
});

router.patch('/:id', async(req, res) => {
  try{
    const updatedProfile = await db.profiles.updateProfile({ _id: req.params.id },
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
