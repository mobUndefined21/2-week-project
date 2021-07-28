const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log(`db connected on user ${process.env.DB_USER}!`)
);

const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
io.clients = [];
io.on('connection', (socket) => {
  socket.on('handshake', data => {
    io.clients.push({ profileId: data.profileId, socket })
    console.log(`new client: ${data.profileId}`)
  });
});
http.listen(8081);

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/profiles', require('./routes/profiles'));

app.use((req,res,next) => {
  req.io = io;
  next();
})

app.use('/api/messages', require('./routes/messages'));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
