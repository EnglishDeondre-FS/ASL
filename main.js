const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const planetRoutes = require('./routes/planet.routes');
const starRoutes = require('./routes/star.routes');
const galaxyRoutes = require('./routes/galaxy.routes');
const connection = require('./models/connection');

// using multer for file uploads
// see: https://www.npmjs.com/package/multer

const app = express();
const port = 8080;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: '*'}));

app.use('/planets', planetRoutes);
app.use('/stars', starRoutes);
app.use('/galaxies', galaxyRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: "Hello, World", 
  });
});

connection.sync({ alter: true })
  .then(() => console.log('Database worky'))
  .catch((err) => console.log(`Database broky:${err}`));  

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
