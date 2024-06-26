const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4044;
const db = require('./dbConnection.js')
const router = require('./routes.js');

// middlewares 
app.use(cors())
app.use(express.static(`${__dirname}/upload`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Child Crescendo API home route is working!')
})
app.use('/child_crescendo_api', router);

// this route should be last for handling undefined routes
app.all('/*', (req, res) => {
  res.status(500).json("Please check the route")
})



app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})