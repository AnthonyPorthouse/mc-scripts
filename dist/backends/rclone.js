"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemotes = void 0;
const child_process_1 = require("child_process");
function getRemotes() {
    return (0, child_process_1.execSync)("rclone listremotes")
        .toString("utf-8")
        .split("\n")
        .map((remote) => remote.replace(/:.*/, ""))
        .filter((remote) => remote);
}
exports.getRemotes = getRemotes;
