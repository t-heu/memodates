"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = require("../../../config/auth");
const auth = (request, requireAuth = true) => {
    const { authorization } = request.headers;
    if (authorization) {
        const [, token] = authorization.split(' ');
        const { id } = jsonwebtoken_1.verify(token, auth_1.ACCESS_TOKEN_SECRET);
        return id;
    }
    if (requireAuth) {
        throw new Error('Login in to access resource');
    }
    return null;
};
exports.default = auth;
//# sourceMappingURL=auth.js.map