import multer from 'multer';
import express from 'express';
import Server from './server.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
const includeMulter = multer().any();

app.use(cors());

app.use((req, res, next) => {
    includeMulter(req, res, next)
});

app.use(express.static('public'));

new Server(app, PORT, true);
