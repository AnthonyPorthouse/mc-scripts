#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const download_1 = require("./actions/download");
const init_1 = require("./actions/init");
const upload_1 = require("./actions/upload");
const config_1 = __importDefault(require("./config"));
const app = new commander_1.Command('mc-scripts');
app.command('config')
    .action(() => {
    console.debug(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config);
});
app.command('init')
    .action(init_1.init);
app.command('upload')
    .addArgument(new commander_1.Argument('[from]').default(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.local))
    .addArgument(new commander_1.Argument('[to]').default(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.remote))
    .addOption(new commander_1.Option('-d, --dry-run'))
    .addOption(new commander_1.Option('-v, --verbose', 'use verbose logging'))
    .action(upload_1.upload);
app.command('download')
    .addArgument(new commander_1.Argument('[from]').default(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.remote))
    .addArgument(new commander_1.Argument('[to]').default(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.config.defaults.local))
    .addOption(new commander_1.Option('-d, --dry-run'))
    .addOption(new commander_1.Option('-v, --verbose', 'use verbose logging'))
    .action(download_1.download);
app.parseAsync();
