import { __init__ } from "../../controller/upload.js";


export default {
    path: '/',
    callback: async(req, res) => {
        __init__(req, res);
    }
}