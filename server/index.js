const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log(`db connected on user ${process.env.DB_USER}!`)
);

app.use(express.json());
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
