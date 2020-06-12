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
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const authConfig = require("../../../config/auth");
const User_1 = require("../../../domain/User");
class UserRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(User_1.User);
    }
    create({ yourBirthday, email, password, name, hasFacebook, hasPassword }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.ormRepository.create({
                yourBirthday,
                email,
                password,
                hasFacebook,
                hasPassword,
                name
            });
            user.acess_token = jsonwebtoken_1.sign({ id: user.id }, authConfig.ACCESS_TOKEN_SECRET, {
                expiresIn: authConfig.EXPIRES_IN,
            });
            yield this.ormRepository.save(user);
            return user;
        });
    }
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne({
                email,
            });
            return user || false;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.ormRepository.findOne({
                where: { id },
                relations: ["birthday"]
            });
            return user;
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.js.map