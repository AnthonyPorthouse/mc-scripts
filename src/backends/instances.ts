import { getMinecraftInstances } from "./minecraft";
import { getMultiMcInstances } from "./multimc";
import { getPrismInstances } from "./prism";

export function getInstances(): string[] {
    const instances: string[] = [
        ...getMinecraftInstances(),
        ...getMultiMcInstances(),
        ...getPrismInstances(),
    ];

    return instances
}
