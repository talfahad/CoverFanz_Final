"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_1 = require("@nestjs/graphql");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path = __importStar(require("path"));
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_schema_1 = require("./config.schema");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const booking_module_1 = require("./booking/booking.module");
const review_module_1 = require("./review/review.module");
const promotion_module_1 = require("./promotion/promotion.module");
const report_module_1 = require("./report/report.module");
const feature_module_1 = require("./feature/feature.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path.join(__dirname, '..', 'client'),
                exclude: ['*/graphql'],
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['config.env'],
                validationSchema: config_schema_1.configValidationSchema,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                connectionName: 'DB1',
                useFactory: async (config) => ({
                    uri: config.get('DB_DATABASE_1'),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
                inject: [config_1.ConfigService],
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.gql',
                formatError: (error) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    const graphQLFormattedError = {
                        message: ((_b = (_a = error.extensions) === null || _a === void 0 ? void 0 : _a.exception) === null || _b === void 0 ? void 0 : _b.response) ||
                            ((_e = (_d = (_c = error.extensions) === null || _c === void 0 ? void 0 : _c.exception) === null || _d === void 0 ? void 0 : _d.response) === null || _e === void 0 ? void 0 : _e.message) ||
                            ((_g = (_f = error.extensions) === null || _f === void 0 ? void 0 : _f.response) === null || _g === void 0 ? void 0 : _g.message) ||
                            error.message ||
                            'Unknown Error Occured',
                        statusCode: ((_j = (_h = error.extensions) === null || _h === void 0 ? void 0 : _h.exception) === null || _j === void 0 ? void 0 : _j.status) ||
                            ((_m = (_l = (_k = error.extensions) === null || _k === void 0 ? void 0 : _k.exception) === null || _l === void 0 ? void 0 : _l.response) === null || _m === void 0 ? void 0 : _m.statusCode) ||
                            ((_p = (_o = error.extensions) === null || _o === void 0 ? void 0 : _o.response) === null || _p === void 0 ? void 0 : _p.statusCode) ||
                            500,
                    };
                    return graphQLFormattedError;
                },
                context: ({ req, connection, res }) => connection ? { req: connection.context, res } : { req, res },
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            booking_module_1.BookingModule,
            review_module_1.ReviewModule,
            promotion_module_1.PromotionModule,
            report_module_1.ReportModule,
            feature_module_1.FeatureModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map