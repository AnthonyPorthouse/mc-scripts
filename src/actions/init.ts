import { writeFileSync } from "fs";
import { homedir } from "os";
import { exit } from "process";
import prompts from "prompts";
import { stringify } from "yaml";
import { getInstances } from "../backends/instances";
import { getRemotes } from "../backends/rclone";
import config from "../config";

export async function init() {
  const response = await prompts([
    {
      type: "select",
      name: "remote",
      message: "Select Default rclone remote",
      choices: getRemotes().map((remote) => ({ title: remote, value: remote })),
      initial: config?.config.defaults.remote ? getRemotes().indexOf(
          config?.config.defaults.remote.replace(/:.*/, "")
        ) : 0,
    },
    {
      type: "text",
      name: "remote-path",
      message: "Set the path to store on the remote",
      initial: config?.config.defaults.remote.replace(/.*?:/, ""),
    },
    {
      type: "select",
      name: "local",
      message: "Select Default local instance",
      choices: getInstances().map((instance) => ({
        title: instance,
        value: instance,
      })),
      initial: config?.config.defaults.local ? getInstances().indexOf(config?.config.defaults.local) : 0,
    },
  ], { onCancel() {
    exit(1)
  }});

  console.log("Updating Config");

  const configFilepath = config
    ? config.filepath
    : `${homedir()}/.config/.mc-scriptsrc.yaml`;

  writeFileSync(
    configFilepath,
    stringify({
      defaults: {
        remote: `${response.remote}:${response["remote-path"]}`,
        local: response.local,
      },
    })
  );

  config?.filepath;
}
