import { upload } from "../../controller/upload.js";


export default {
    path: '/',
    callback: async(req, res) => {
        upload(req, res);
    }
}