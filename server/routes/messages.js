const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../auth');

router.use(authenticate);

router.use((req, res, next) => {
  next();
});

router.get('/profile/:profileId', async (req, res) => {
  return res.json({ids: await db.messages.getConversations(req.params.profileId)});
});
router.get('/', async (req, res) => {
  return res.json({ids: await db.messages.getConversations('getAll')});
});

router.get('/:conversationId/latest', async (req, res) => {
  try {
    const newMessages = await db.messages.getMessages(req.params.conversationId, req.body.ts);
    return res.status(200).json({newMessages});
  } catch(err) {
    console.error(err);
    res.json({message: err.message}).end();
  }
});

router.get('/:conversationId', async (req, res) => {
  try {
    const conversation = await db.messages.getConversationById(req.params.conversationId);
    if (!conversation) {
      const err = new Error('Conversation not found');
      err.statusCode = 404;
      throw err;
    }
    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode).end();
  }
});

router.post('/new', async (req, res) => {
  try {
    const conversationId = await db.messages.newConversation(req.body.participants); 
    res.status(201).json({ conversationId }).end();
  } catch (err) {
    console.error(err);
    res.json({ message: err.message });
  }
});

router.post('/:conversationId', async (req, res) => {
  try {
    const { body, profileId } = req.body;   
    await db.messages.postMessage(body, req.params.conversationId, profileId);
    res.status(201).json({message: 'OK'}).end();
  } catch (err) {
    console.error(err);
    res.json({ message: err.message });
  }
});

module.exports = router;