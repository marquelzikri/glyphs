const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');

// Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const contents = require('./routes/api/contents');
const feeds = require('./routes/api/feeds');

const app = express();

const feedsDownloader = require('./routes/common/feedsDownloader');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mlab MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

setInterval(feedsDownloader.fetchRSS, 60000);// Download feeds every 1 minute

  // Passport  middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/Profile', profile);
app.use('/api/contents', contents);
app.use('/api/feeds', feeds);
app.use(cors({
  origin: 'http://localhost:5000/',
  credentials: true
}));

if (process.env.NODE_ENV === 'production') {
  // Set status folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
