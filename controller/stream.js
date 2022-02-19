import { getFile } from "../memory/index.js";
import fs from 'fs';
import Response from "../utils/Response.js";

function render(req, res) {
    const index_file = `
    <html>
      <title>Sample Video Stream</title>
      <body>
          <video width="320" height="240" controls>
              <source src="/`+ req.params.id + `/play" type="video/mp4"/>
              Your browser does not support the <code>video</code> element.
          </video>
          <br>
      </body>
    </html>`;
    res.send(index_file);
}

async function stream(req, res) {
    let buffer;
    const id = req.params.id;
    try {
        buffer = await getFile(id);
    } catch (e) {
        console.log(e);
        res.send(Response.error('Invalid video id'));
        return;
    }

    pipe(req, res, buffer);
}

function pipe(req, res, buffer) {
    const total = buffer.length;
    let range = req.headers.range;
    if (range) {
        let positions = range.replace(/bytes=/, "").split("-");
        let start = parseInt(positions[0], 10);
        let end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        let chunksize = (end - start) + 1;
        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });
        res.end(buffer.slice(start, end + 1), "binary");

    } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
        fs.createReadStream(`./uploads/${req.params.id}.mp4`).pipe(res);
    }
}

export { render, stream, pipe }