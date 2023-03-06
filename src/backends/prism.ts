import { homedir } from 'node:os'
import { existsSync, readdirSync } from 'node:fs'

export function getPrismInstances(): string[] {
    const locations = findPrismLocations()

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

export function findPrismLocations() {
    const locations = [`${homedir()}/.var/app/org.prismlauncher.PrismLauncher/data/PrismLauncher/instances`]

    const foundLocations: string[] = [];

    locations.forEach((location) => {
        if (existsSync(location)) {
            foundLocations.push(location);
        }
    })

    return foundLocations
}
