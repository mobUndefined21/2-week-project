const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../auth');

router.get('/', async (req, res, next) => {
  try {
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
    const {description, _id, name, instruments, skills, title, avatar, music } = profile
    res.json({ _id, description, name, instruments, skills, isOwner, title, avatar, music });
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
});

router.post('/:id/music', async (req, res) => {
  try {
    const { type, link } = req.body;
    const profile = await db.profiles.getProfile({ _id: req.params.id });
    const target = profile.music.find((embed, i) => embed.link == link);
    await db.profiles.updateProfile({ _id: req.params.id }, { $push: { music: { type, link } } });
    return res.status(201).json({message: req.body}).end();
  } catch (err) {
    console.error(err);
    res.json({message: err}); 
  }
});

router.delete('/:id/music', async (req, res) => {
  try {
  const { link } = req.body;
  const profile = await db.profiles.getProfile({ _id: req.params.id });
  console.log(profile.music, link)
  const target = profile.music.find((embed, i) => embed.link == link);
  console.log(target);
  if (target) {
    await db.profiles.updateProfile({ _id: req.params.id }, { $pull: { music: { link: link }} });
    return res.status(201).json({message: req.body}).end();
  }
  } catch (err) {
    console.error(err);
    res.json({message: err}); 
  }
});

router.post('/:id/:skillset', async (req, res) => {
  try {
    const { name } = req.body;
    const profile = await db.profiles.getProfile({ _id: req.params.id });
    const skillset = profile[req.params.skillset];
    const target = skillset.find((skill, i) => skill.name == name);

    if (target) {
      const query = `${req.params.skillset}.name`;
      const element = `${req.params.skillset}.$.skill`;
      await db.profiles.updateProfile({ _id: req.params.id, [query]: name }, { $set: { [element]: skill } });
      return res.status(201).json({message: req.body}).end();
    }
    await db.profiles.updateProfile({ _id: req.params.id }, { $push: { [req.params.skillset]: {name} } });
    return res.status(201).json({message: req.body}).end();
  } catch(err) {
    console.log(err.message);
    res.json({message: err}); 
  }
});

router.delete('/:id/:skillset', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.body)
    const profile = await db.profiles.getProfile({ _id: req.params.id });
    const skillset = profile[req.params.skillset];
    const target = skillset.find((skill, i) => skill.name == name);
    console.log(target)
    if (target) {
      await db.profiles.updateProfile({ _id: req.params.id }, { $pull: { [req.params.skillset]: { name: target.name } }});
      return res.status(201).json({ message: 'removed', item: req.body }).end();
    }
    return res.status(404).end();
  } catch(err) {
    console.log(err.message);
    res.json({message: err}); 
  }
});

module.exports = router;
