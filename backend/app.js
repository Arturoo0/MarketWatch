
const express = require('express')
const app = express()
const port = 3000

const auth = require('./routes/auth.js');

app.use('/auth', auth.authRouter);

app.get('/', (req, res) => {
  res.send('Server is running.');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})