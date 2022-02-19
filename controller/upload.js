import pkg from 'express';
import multer from 'multer';
import path from 'path';
import config from '../config/config.js';
import { write, writeFile } from '../memory/index.js';
import IResponse from '../utils/Response.js';
import uuid from 'uuid-random';
import fs from 'fs';


const { Response, Request } = pkg;
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const __init__ = (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'))
}

const upload = (request, response) => {
    const host = request.hostname == 'localhost' ? `${request.hostname}:3000` : request.hostname;
    const file = request.files[0];
    const fileId = uuid();
    const link = `http://${host}/${fileId}/play`;

    const data = {
        name: file.originalname,
        size: file.size,
        encoding: file.encoding,
        details: request.body.details ? request.body.details : '',
        time: Date.now()
    }

    writeFile(fileId, file.buffer);
    write(fileId, data)
    response.send(IResponse.success({ link: link }));

}

export { __init__, upload };

