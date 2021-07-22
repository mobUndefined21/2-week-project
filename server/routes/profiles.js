const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../auth');

router.get('/', async (req, res, next) => {
  try{
    const allProfiles = await db.profiles.findProfiles();
    res.json(allProfiles);
  } catch(err) {
    res.json({ message: err.message });
  }
});

router.use(authenticate);

router.get('/:id', async (req, res) => {
  try{
    const profile = await db.profiles.getProfile({ _id: req.params.id });
    const isOwner = profile.user._id.toString() === req.user_id.toString();
    const {description, name, instruments, skills } = profile
    res.json({ description, name, instruments, skills, isOwner });
  } catch(err) {
    res.json({message: err});
  }
});

router.patch('/:id', async(req, res) => {
  console.log('patch by: ' + req.user_id);
  try{
    const updatedProfile = await db.profiles.updateProfile({ _id: req.params.id },{ $set: req.body });
    res.json(req.body);
  }
  catch(err) {
    res.json({message: err.message})
  }
})

router.post('/:id/:skillset', async (req, res) => {
  try {
    const { name, skill } = req.body;
    const profile = db.profiles.getProfile({ _id: req.params.id });
    const skillset = profile['skillset'];
    const index = skillset.find((skill) => skill.name == name);

    await db.profiles.updateProfile({ _id: req.params.id }, { $push: { [req.params.skillset]: {name, skill} } });
    return res.status(201).json({message: req.body}).end();
  } catch(err) {
    console.log(err.message);
    res.json({message: err}); 
  }
});

module.exports = router;
