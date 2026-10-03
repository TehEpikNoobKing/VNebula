const DEFAULT_SETTINGS = {
    "game-filter": false,
    "recently-played": false,
    "status-viewer": false,
    "forum-linker": false,
    "standard-pages": false,
    "avatar-linker": false,
    "tab-stretcher": false,
    "quick-search": false,
    "global-search": false
};

export async function getSettings() {
    return await chrome.storage.sync.get(DEFAULT_SETTINGS);
}

export async function setSetting(name, value) {
    await chrome.storage.sync.set({
        [name]: value
    });

    console.log(name, value)
}

export async function getSetting(name) {
    const settings = await chrome.storage.sync.get({
        [name]: DEFAULT_SETTINGS[name]
    });

    return settings[name];
}