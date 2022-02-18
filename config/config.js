import multer from 'multer';
import fs from 'fs';
import { FILE_PATH } from './consts.js';

const limits = {
    fileSize: 100 * 1024 * 1024
}

const filter = (request, file, callback) => {
    if (!file || file.mimetype !== 'video/mp4')
        return callback({ errorMessage: 'Invalid file type' });
    callback(null, true);
}

const fileName = (request, file, callback) => callback(null, `${Date.now()}-${file.originalname.replaceAll(/\s/g, '_')}`)

const destination = (request, file, callback) => {
    try {
        fs.statSync(FILE_PATH);
    } catch (err) {
        fs.mkdirSync(FILE_PATH);
    }

    callback(null, FILE_PATH);
}

const storage = multer.diskStorage({
    destination: destination,
    filename: fileName,
});

const config = {
    storage: storage,
    limits: limits,
    fileFilter: filter
}

export default config;
export { filter, config, destination, fileName, storage };
