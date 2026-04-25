const express = require('express');
const cookie_parser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookie_parser());
app.use(cors({ 
    origin: ['http://localhost:5173', 'https://vibe-nest-ivory.vercel.app'],
     credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/music' , musicRoutes);


module.exports = app;