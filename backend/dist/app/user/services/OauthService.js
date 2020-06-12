"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const axios_1 = require("axios");
const tsyringe_1 = require("tsyringe");
const jsonwebtoken_1 = require("jsonwebtoken");
const authConfig = require("../../../config/auth");
var ServicesTypes;
(function (ServicesTypes) {
    ServicesTypes["FACEBOOK"] = "FACEBOOK";
    ServicesTypes["GOOGLE"] = "GOOGLE";
})(ServicesTypes || (ServicesTypes = {}));
let OauthService = class OauthService {
    constructor(createRepository) {
        this.createRepository = createRepository;
        this.service = {
            "FACEBOOK": this.facebookService,
            "GOOGLE": this.googleService
        };
    }
    execute({ access_token, TypeServiceOauth }) {
        return this.service[TypeServiceOauth](access_token);
    }
    facebookService(access_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const URI = `https://graph.facebook.com/me?fields=birthday,email,name,picture&access_token=${access_token}`;
            try {
                const response = yield axios_1.default.get(URI);
                const { email, id, name } = response.data;
                const usersExist = yield this.createRepository.findEmail(email);
                if (!usersExist) {
                    const user = yield this.createRepository.create({
                        email,
                        yourBirthday: '2/3',
                        password: id,
                        name,
                        hasPassword: false,
                        hasFacebook: true
                    });
                    return user;
                }
                usersExist.acess_token = jsonwebtoken_1.sign({ id: usersExist.id }, authConfig.ACCESS_TOKEN_SECRET, {
                    expiresIn: authConfig.EXPIRES_IN,
                });
                return usersExist;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    googleService() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
};
OauthService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UserRepository')),
    __metadata("design:paramtypes", [Object])
], OauthService);
exports.default = OauthService;
//# sourceMappingURL=OauthService.js.map