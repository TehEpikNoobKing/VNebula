const settingsSidebar = document.querySelector(".sidebar-tabs")
const settingsMain = document.querySelector(".settings-main-panel")

const notice = document.querySelector(".notice")

const navRail = document.querySelector(".site-nav-rail")
const navationSide = document.querySelector(".site-navigation")

const pageContent = document.querySelector(".page-content")
const shell = document.querySelector(".site-shell")

const headerAccount = false
const topbar = document.querySelector(".site-topbar")

let VKHeaderButton = null

if (headerAccount) {
    VKHeaderButton = document.createElement("button")

    VKHeaderButton.type = "button"
    VKHeaderButton.id = "site-vortex-kitty"
    VKHeaderButton.className = "site-icon-button"
    VKHeaderButton.setAttribute("aria-label", "VortexKitty")
    VKHeaderButton.title = "VortexKitty"

    const icon = document.createElement("i")
    icon.className = "fa-solid fa-shield-cat"
    icon.setAttribute("aria-hidden", "true")
    icon.style.width = "24px"
    icon.style.height = "24px"
    icon.style.fontSize = "24px"

    VKHeaderButton.appendChild(icon)
    headerAccount.appendChild(VKHeaderButton)

    VKHeaderButton.addEventListener("click", () => {
        window.location.href =
            "https://playvortex.io/settings?vortexkitty=features_home";
    });
}
