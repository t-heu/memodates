"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config({
    path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
});
const typeorm_1 = require("typeorm");
const User_1 = require("../../../domain/User");
const Birthday_1 = require("../../../domain/Birthday");
exports.default = (name = 'default') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const defaultOptions = yield typeorm_1.getConnectionOptions();
        return typeorm_1.createConnection(Object.assign(defaultOptions, {
            entities: [User_1.User, Birthday_1.Birthday],
            name,
            database: process.env.DB_DATABASE,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        }));
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
//# sourceMappingURL=index.js.map