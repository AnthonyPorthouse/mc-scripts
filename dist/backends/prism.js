"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPrismLocations = exports.getPrismInstances = void 0;
const node_os_1 = require("node:os");
const node_fs_1 = require("node:fs");
function getPrismInstances() {
    const locations = findPrismLocations();
    const instances = [];
    locations.forEach((location) => {
        (0, node_fs_1.readdirSync)(location, { withFileTypes: true }).forEach((file) => {
            if (file.isDirectory() && (0, node_fs_1.existsSync)(`${location}/${file.name}/.minecraft`)) {
                instances.push(`${location}/${file.name}`);
            }
        });
    });
    return instances;
}
exports.getPrismInstances = getPrismInstances;
function findPrismLocations() {
    const locations = [`${(0, node_os_1.homedir)()}/.var/app/org.prismlauncher.PrismLauncher/data/PrismLauncher/instances`];
    const foundLocations = [];
    locations.forEach((location) => {
        if ((0, node_fs_1.existsSync)(location)) {
            foundLocations.push(location);
        }
    });
    return foundLocations;
}
exports.findPrismLocations = findPrismLocations;
