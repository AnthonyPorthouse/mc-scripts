import { getMinecraftInstances } from "./minecraft";
import { getPrismInstances } from "./prism";

export function getInstances(): string[] {
    const instances: string[] = [
        ...getMinecraftInstances(),
        ...getPrismInstances(),
    ];

    return instances
}
