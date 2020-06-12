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
const tsyringe_1 = require("tsyringe");
const auth_1 = require("./middlewares/auth");
const CreateUserService_1 = require("../../app/user/services/CreateUserService");
const CreateBirthdayService_1 = require("../../app/birthday/services/CreateBirthdayService");
const AuthenticateUserService_1 = require("../../app/user/services/AuthenticateUserService");
const UserProfileService_1 = require("../../app/user/services/UserProfileService");
const OauthService_1 = require("../../app/user/services/OauthService");
const resolvers = {
    Query: {
        profile: (_, root, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const id = auth_1.default(req);
            const profile = tsyringe_1.container.resolve(UserProfileService_1.default);
            const res = yield profile.execute({ id });
            return res;
        }),
    },
    Mutation: {
        signup: (_, root) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, yourBirthday, password, name } = root;
            const create_user = tsyringe_1.container.resolve(CreateUserService_1.default);
            const res = yield create_user.execute({ email, yourBirthday, password, name, hasPassword: true, hasFacebook: false });
            return res;
        }),
        signin: (_, root) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = root;
            const authUser = tsyringe_1.container.resolve(AuthenticateUserService_1.default);
            const res = yield authUser.execute({ email, password });
            return res;
        }),
        oauth: (_, root) => __awaiter(void 0, void 0, void 0, function* () {
            const { access_token, TypeServiceOauth } = root;
            const oauth = tsyringe_1.container.resolve(OauthService_1.default);
            const response = yield oauth.execute({ access_token, TypeServiceOauth });
            return response;
        }),
        createBirthday: (_, root, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const provider_id = auth_1.default(req);
            const { name, date, idExist } = root;
            const create_birthday = tsyringe_1.container.resolve(CreateBirthdayService_1.default);
            const res = yield create_birthday.execute({ provider_id, name, date, idExist });
            return res;
        })
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map