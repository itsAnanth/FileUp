import pkg from 'express';
import path from 'path';

const { Response, Request } = pkg;
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const __init__ = (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../public/index.html'))
}

export { __init__ };