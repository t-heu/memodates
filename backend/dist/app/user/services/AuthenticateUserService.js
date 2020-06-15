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
const tsyringe_1 = require("tsyringe");
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("../../../interface/utils/auth");
let AuthenticateUserService = class AuthenticateUserService {
    constructor(createRepository) {
        this.createRepository = createRepository;
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.createRepository.findEmail(email);
            if (!user)
                throw new Error('User not Found');
            if (!user.hasPassword) {
                throw new Error('connected with service FACEBOOK or others');
            }
            if (password) {
                if (!(yield bcryptjs_1.compare(password, user.password))) {
                    throw new Error('invalid password');
                }
            }
            return auth_1.default(user.id);
        });
    }
};
AuthenticateUserService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UserRepository')),
    __metadata("design:paramtypes", [Object])
], AuthenticateUserService);
exports.default = AuthenticateUserService;
//# sourceMappingURL=AuthenticateUserService.js.map