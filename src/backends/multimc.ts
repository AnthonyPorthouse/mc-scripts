import { homedir } from 'node:os'
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

export function getMultiMcInstances(): string[] {
    const locations = findMultiMcLocations()

    const instances: string[] = []

    locations.forEach((location) => {
        readdirSync(location, {withFileTypes: true}).forEach((file) => {
            if (file.isDirectory() && existsSync(`${location}/${file.name}/.minecraft`)) {
                instances.push(`${location}/${file.name}`)
            }
        })
    })

    return instances
}

export function findMultiMcLocations() {
    const locations = [
        path.join(homedir(), '.local/share/multimc/instances'),
    ]

    const foundLocations: string[] = [];

    locations.forEach((location) => {
        if (existsSync(location)) {
            foundLocations.push(location);
        }
    })

    return foundLocations
}
