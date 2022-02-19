import { stream } from "../../controller/stream.js";

export default {
    path: '/:id/play',
    callback: async(req, res) => {
        stream(req, res);
    }
}