"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const child_process_1 = require("child_process");
const command = `rclone sync --update --transfers 8 --progress`;
function upload(from, to, options) {
    console.log(`Uploading from ${from} to ${to}`);
    if (options.verbose) {
        console.info(arguments, options);
    }
    const script = `${command} "${from}" "${to}"`;
    if (options.dryRun) {
        console.info(`Would execute: ${script}`);
        return;
    }
    options.verbose && console.info(`Execute: ${script}`);
    (0, child_process_1.execSync)(script, { stdio: 'inherit' });
}
exports.upload = upload;
