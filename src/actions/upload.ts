import { execSync } from "child_process";

const command = `rclone sync --update --transfers 8 --progress`

interface Options {
    dryRun: boolean,
    verbose: boolean,
}

export async function upload(from: string, to: string, options: Options) {

    console.log(`Uploading from ${from} to ${to}`)

    const script = `${command} "${from}" "${to}"`

    if (options.dryRun) {
        console.info(`Would execute: ${script}`)
        return
    }

    options.verbose && console.info(`Execute: ${script}`)
    execSync(script, {stdio: 'inherit'})
}
