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
const Birthday_1 = require("../../../domain/Birthday");
class BirthdayRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Birthday_1.Birthday);
    }
    create({ provider_id, name, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const birthday = this.ormRepository.create({
                provider_id,
                name,
                date
            });
            yield this.ormRepository.save(birthday);
            return birthday;
        });
    }
    findById(idExist) {
        return __awaiter(this, void 0, void 0, function* () {
            const birthday = yield this.ormRepository.findOne({ id: Number(idExist) });
            if (birthday) {
                return true;
            }
            return false;
        });
    }
}
exports.default = BirthdayRepository;
//# sourceMappingURL=birthday.js.map