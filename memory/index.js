import fs from 'fs';

const fileName = 'memory/index.js';

const read = () => {
    let data = fs.readFileSync(fileName, 'utf-8');
    return JSON.parse(data ? data : {});
}

const write = (data) => {
    let current = read();
    current[data.id] = data;
    current = JSON.stringify(current);
    fs.writeFileSync(fileName, current, 'utf-8');
}

const get = (id) => {
    if (!id) return null;
    return (read())[id];
}

export { get, write, read };

