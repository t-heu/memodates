"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const authConfig = require("../../config/auth");
exports.default = (id) => {
    return jsonwebtoken_1.sign({ id }, authConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: authConfig.EXPIRES_IN,
    });
};
//# sourceMappingURL=auth.js.map