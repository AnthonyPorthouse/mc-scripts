"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cosmiconfig_1 = require("cosmiconfig");
const explorer = (0, cosmiconfig_1.cosmiconfigSync)('mc-scripts');
const config = explorer.search();
exports.default = config;
