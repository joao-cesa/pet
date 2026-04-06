const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

dns.setDefaultResultOrder('ipv4first');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API do Diário Pet funcionando.' }));
app.use('/api/entries', require('./routes/diaryRoutes'));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pet_diary';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Servidor rodando');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:');
    console.error(err.message);
    console.error(err);
  });