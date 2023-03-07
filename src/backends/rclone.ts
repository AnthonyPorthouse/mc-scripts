import { execSync } from "child_process";

export function getRemotes(): string[] {
  return execSync("rclone listremotes")
    .toString("utf-8")
    .split("\n")
    .map((remote) => remote.replace(/:.*/, ""))
    .filter((remote) => remote);
}
