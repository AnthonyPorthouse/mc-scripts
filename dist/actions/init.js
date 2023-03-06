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
exports.init = void 0;
const fs_1 = require("fs");
const os_1 = require("os");
const process_1 = require("process");
const prompts_1 = __importDefault(require("prompts"));
const yaml_1 = require("yaml");
const prism_1 = require("../backends/prism");
const rclone_1 = require("../backends/rclone");
const config_1 = __importDefault(require("../config"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, prompts_1.default)([
            {
                type: "select",
                name: "remote",
                message: "Select Default rclone remote",
                choices: (0, rclone_1.getRemotes)().map((remote) => ({ title: remote, value: remote })),
                initial: (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.remote) ? (0, rclone_1.getRemotes)().indexOf(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.remote.replace(/:.*/, "")) : 0,
            },
            {
                type: "text",
                name: "remote-path",
                message: "Set the path to store on the remote",
                initial: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.remote.replace(/.*?:/, ""),
            },
            {
                type: "select",
                name: "local",
                message: "Select Default local instance",
                choices: (0, prism_1.getPrismInstances)().map((instance) => ({
                    title: instance,
                    value: instance,
                })),
                initial: (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.local) ? (0, prism_1.getPrismInstances)().indexOf(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.local) : 0,
            },
        ], { onCancel() {
                (0, process_1.exit)(1);
            } });
        console.log("Updating Config");
        const configFilepath = config_1.default
            ? config_1.default.filepath
            : `${(0, os_1.homedir)()}/.config/.mc-scriptsrc.yaml`;
        (0, fs_1.writeFileSync)(configFilepath, (0, yaml_1.stringify)({
            defaults: {
                remote: `${response.remote}:${response["remote-path"]}`,
                local: response.local,
            },
        }));
        config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.filepath;
    });
}
exports.init = init;
