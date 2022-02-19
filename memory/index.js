import fs from 'fs';
import path from 'path';

const fileName = 'memory/files.json';
const filepath = './uploads';

const read = () => {
    let data = fs.readFileSync(fileName, 'utf-8');
    return JSON.parse(String(data ? data : "{}"));
}

const write = (id, data) => {
    let current = read();
    current[id] = data;
    current = JSON.stringify(current);
    fs.writeFileSync(fileName, current, 'utf-8');
}

const writeFile = (id, buffer) => {
    if (!fs.existsSync(filepath)) {
        console.log('dir doesnt exist')
        try {
            fs.mkdirSync(filepath);
        } catch (e) {
            console.log(e)
        }
    }
    fs.writeFileSync(`./uploads/${id}.mp4`, buffer);
    console.log(`wrote file with id ${id}`);
}

const getFile = (id) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./uploads/${id}.mp4`, (err, buffer) => {
            if (err) reject(err);
            else resolve(buffer);
        })
    })
}

const get = (id) => {
    if (!id) return null;
    return (read())[id];
}

export { get, write, read, writeFile, getFile };

