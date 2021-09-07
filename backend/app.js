require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const auth = require('./routes/auth.js');
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001'
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({}));
app.use('/auth', auth.authRouter);

try {
  mongoose.connect(process.env.DB_URI);
}catch (error){
  if (error !== undefined){
    console.log('Error', 'Failed DB connection.');
  }
}

app.get('/', (req, res) => {
  res.send('Server is running.');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})