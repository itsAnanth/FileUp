import { render } from "../../controller/stream.js";

export default {
    path: '/:id',
    callback: async(req, res) => {
        render(req, res);
    }
}