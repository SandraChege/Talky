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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.welcomeUser = void 0;
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const sqlConfig_1 = require("../config/sqlConfig");
const emailhelpers_1 = require("../helpers/emailhelpers");
const welcomeUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sqlConfig_1.sqlConfig);
        const users = yield (yield pool.request().query("SELECT * FROM Users WHERE isWelcomed = 0")).recordset;
        console.log(users);
        /**
         * the data is html
         */
        for (let individualuser of users) {
            ejs_1.default.renderFile("templates/welcomeuser.ejs", { Name: individualuser.username }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
                let mailOptions = {
                    from: process.env.EMAIL,
                    to: individualuser.email,
                    subject: "Welcome Onboard",
                    html: data,
                };
                try {
                    yield (0, emailhelpers_1.sendMail)(mailOptions);
                    /**
                     * change state of receiving email
                     */
                    yield pool
                        .request()
                        .query("UPDATE Users SET isWelcomed = 1 WHERE isWelcomed = 0");
                    console.log("Emails send to new users");
                }
                catch (error) {
                    console.log(error);
                }
            }));
        }
    }
    catch (error) {
        console.log("error is ", error);
    }
});
exports.welcomeUser = welcomeUser;
