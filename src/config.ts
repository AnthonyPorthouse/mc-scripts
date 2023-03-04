import { cosmiconfigSync } from "cosmiconfig";

const explorer = cosmiconfigSync('mc-scripts')

const config = explorer.search()

export default config
