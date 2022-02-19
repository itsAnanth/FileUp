import fs from 'fs';
import { TTL_FILE, TTL_INTERVAL } from '../config/consts.js';
import { read, _delete } from './index.js';

function delete_ttl() {
    for (const [k, v] of Object.entries(read())) {
        if (Date.now() - v.time > TTL_FILE) {
            const file = `./uploads/${k}.mp4`;
            if (!fs.existsSync(file)) {
                _delete(k);
                continue
            };
            fs.unlink(file, (err) => {
                if (err) return console.error(err);
                _delete(k);
                console.log(`deleted video with id ${k}`);
            });
        }
    }
}

function TTL() {
    return setInterval(() => delete_ttl(), TTL_INTERVAL);
}



export default TTL;