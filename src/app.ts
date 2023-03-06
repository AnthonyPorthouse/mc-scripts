#!/usr/bin/env node

import { Argument, Command, Option } from "commander";
import { download } from "./actions/download";
import {init} from "./actions/init";
import { upload } from "./actions/upload";
import config from "./config";

const app = new Command('mc-scripts')

app.command('config')
    .action(() => {
        console.debug(config?.config)
    })

app.command('init')
    .action(init)

app.command('upload')
    .addArgument(new Argument('[from]').default(config?.config.defaults.local))
    .addArgument(new Argument('[to]').default(config?.config.defaults.remote))
    .addOption(new Option('-d, --dry-run'))
    .addOption(new Option('-v, --verbose', 'use verbose logging'))
    .action(upload);

app.command('download')
    .addArgument(new Argument('[from]').default(config?.config.defaults.remote))
    .addArgument(new Argument('[to]').default(config?.config.defaults.local))
    .addOption(new Option('-d, --dry-run'))
    .addOption(new Option('-v, --verbose', 'use verbose logging'))
    .action(download);

app.parseAsync();
