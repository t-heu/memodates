"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
routes.get('/v2/notiSend', (req, res) => {
    return res.status(200).send('hahah');
});
exports.default = routes;
//# sourceMappingURL=routes.js.map