const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://0.0.0.0:27017/ads', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use(
  session({
    secret: 'xyz567',
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  })
);


app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
