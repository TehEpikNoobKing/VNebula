import { getSettings, setSetting } from "../shared/storage.js"

const features = [
    "game-filter",
    "recently-played",
    "status-viewer",
    "forum-linker",
    "standard-pages",
    "avatar-linker",
    "tab-stretcher",
    "quick-search",
    "global-search"
]

const settings = await getSettings()

console.log(settings)

for (const feature of features) {
    const checkbox = document.getElementById(feature)

    checkbox.checked = settings[feature]

    checkbox.addEventListener("change", async () => {
        await setSetting(feature, checkbox.checked)
    })
}