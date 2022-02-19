import express from 'express';
import Server from './server.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('public'));

new Server(app, PORT, true);
