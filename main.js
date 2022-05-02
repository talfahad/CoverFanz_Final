"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const express_1 = require("express");
async function bootstrap() {
    const logger = new common_2.Logger('Main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ skipMissingProperties: true }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_1.json)({ limit: '15mb' }));
    const port = process.env.PORT;
    await app.listen(port);
    logger.log(`Application listening on Port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map