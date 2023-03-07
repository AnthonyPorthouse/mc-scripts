import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os"
import path from "node:path"

export function getMinecraftInstances(): string[] {
    const instances: string[] = [];

    const defaultPath = path.join(homedir(), '.minecraft');

    if (!existsSync(defaultPath)) {
        return instances;
    }

    instances.push(defaultPath);

    const profilesPath = path.join(defaultPath, 'launcher_profiles.json')
    if (!existsSync(profilesPath)) {
        return instances;
    }

    const profiles: MinecraftProfilesFile = JSON.parse(readFileSync(profilesPath, { encoding: 'utf-8' }))

    for (const [, profile] of Object.entries(profiles.profiles)) {
        if (profile.gameDir) {
            instances.push(profile.gameDir)
        }
    }

    return instances
}


interface MinecraftProfilesFile {
    profiles: {
        [key: string]: {
            gameDir?: string
        }
    }
}
