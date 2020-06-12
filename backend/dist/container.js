"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const user_1 = require("./infra/repositories/typeorm/user");
const birthday_1 = require("./infra/repositories/typeorm/birthday");
tsyringe_1.container.registerSingleton('UserRepository', user_1.default);
tsyringe_1.container.registerSingleton('BirthdayRepository', birthday_1.default);
//# sourceMappingURL=container.js.map