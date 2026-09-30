const DEFAULT_SETTINGS = {
    siteNotices: true,
    webRedesign: true,
    removeSocials: false,
};

function toggleNotices(enable) {
    notice.className = enable ? "notice notice-blue" : "blank"
}

function toggleRedesign(enable) {
    if (enable == false) { return }
    
    topbar.style.background = "linear-gradient(180deg, var(--palette-purple), var(--palette-purple-muted))"
    topbar.style.padding = "12px"

    const volticon = document.querySelector(".site-balance .site-icon")
    volticon.setAttribute("src", "https://github.com/TehEpikNoobKing/VortBlox/blob/0f73d47aa9df653c5ce0808d03b5f581384e7380/volts.svg?raw=true");
    volticon.height = "16"
    volticon.width = "16"
    
    navRail.style.paddingLeft = "12px"
    navRail.style.paddingRight = "12px"
    navRail.style.paddingTop = "12px"
    navRail.style.border = "var(--card-border-width, 1px) solid var(--card-border-color, var(--color-border))"
    navRail.style.background = "var(--card-background, var(--color-surface))"

    shell.style.padding = "0"
    pageContent.style.paddingTop = "24px"
}

function toggleSocials(enable) {
    if (enable == false) { return }

    document.querySelector('a[title="Twitter"]')?.remove()
    document.querySelector('a[title="Discord"]')?.remove()
}

async function loadSettings() {
    return await chrome.storage.local.get(DEFAULT_SETTINGS)
}

async function applySettings() {
    const settings = await loadSettings()

    console.log("applying settings")

    toggleNotices(settings.enableNotices)
    toggleRedesign(settings.webRedesign)
    toggleSocials(settings.removeSocials)
}