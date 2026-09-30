const url = new URL(window.location.href);

const params = new URLSearchParams(window.location.search);

function updateTab() {
    const params = new URLSearchParams(window.location.search)
    const feature = params.get("vortexkitty")

    const currentTab = feature?.replace("features_", "")

    document.querySelectorAll(".sidebar-tab").forEach(button => {
        const isActive = button.getAttribute("data-tab") === currentTab

        button.classList.toggle("active", isActive)

        if (isActive) {
            button.setAttribute("aria-current", "page")
        } else {
            button.removeAttribute("aria-current")
        }
    });
}

async function constructTabFrame(tabURL, options) {
    console.log("constructTabFrame called");

    const tabFrame = document.createElement("div")
    tabFrame.id = "tab-vortexkitty-" + tabURL
    tabFrame.className = "tab-content"
    tabFrame.style.display = "flex"
    tabFrame.style.flexDirection = "column"

    for (const x of options) {
        const row = document.createElement("div")
        row.className = "settings-row"

        const rowInfo = document.createElement("div")
        rowInfo.className = "row-info"

        const title = document.createElement("div")
        title.textContent = x.name
        title.className = "row-label"

        const description = document.createElement("div")
        description.textContent = x.description
        description.className = "row-desc"

        rowInfo.appendChild(title);
        rowInfo.appendChild(description);

        row.appendChild(rowInfo);

        const value = DEFAULT_SETTINGS[x.enum];

        if (x.optionType === "checkbox") {
            const label = document.createElement("label");
            label.className = "field-switch";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            const slider = document.createElement("span");
            slider.className = "switch-slider";

            label.appendChild(checkbox);
            label.appendChild(slider);
            row.appendChild(label);

            const saved = await browser.storage.local.get(x.enum);

            checkbox.checked = saved[x.enum] ?? value;

            checkbox.addEventListener("change", () => {
                browser.storage.local.set({
                    [x.enum]: checkbox.checked
                });
            });
        }

        tabFrame.appendChild(row)
    }

    settingsMain.appendChild(tabFrame)
}

function createNewTab(tabURL, tabName, tabIcon, useFAicon) {
    const button = document.createElement("button")
    const label = document.createElement("span")

    if (tabIcon == null) {
        const icon = document.createElement("i")
        icon.className = "fa-solid " + useFAicon
        button.appendChild(icon)
    }
    else {
        const icon = document.createElement("img")
        icon.width = 16
        icon.height = 15
        icon.setAttribute("src", tabIcon)
        button.appendChild(icon)
    }

    if (tabURL == "return") {
        button.className = "btn-danger"
    }
    else {
        button.className = "sidebar-tab"
    }
    
    label.appendChild(document.createTextNode(tabName))

    button.addEventListener("click", () => {
        console.log("Redirecting to:", tabURL);

        if (tabURL == "return") {
            window.location.assign("https://playvortex.io/settings")
        }
        else {
            window.location.href = "https://playvortex.io/settings?vortexkitty=features_" + tabURL
        }
    });

    button.setAttribute("data-tab", tabURL)

    settingsSidebar.appendChild(button)
    button.appendChild(label)
}

if (settingsSidebar) {
    if (url.searchParams.get("vortexkitty") === "features_home") {
        settingsMain.innerHTML = ""
        settingsSidebar.innerHTML = ""
        createNewTab("general", "General", "https://playvortex.io/icons/catalog/home.svg?v=704e5356")
        createNewTab("return", "Return to Vortex", null, "fa-rotate-left")

        constructTabFrame("general", [
            {
                name: "Enable Site Notices",
                enum: "siteNotices",
                description: "Turns the website notice banners on.",
                optionType: "checkbox",
                func: toggleNotices
            },
            {
                name: "Website Redesign",
                enum: "webRedesign",
                description: "Changes the website to be more personalised!",
                optionType: "checkbox",
                func: toggleRedesign
            },
            {
                name: "Remove Socials",
                enum: "removeSocials",
                description: "Removes the social elements on the side bar.",
                optionType: "checkbox",
                func: toggleSocials
            },
        ])

        updateTab()
    }
    else {
        const settingsButton = document.createElement("button")
        const settingsIcon = document.createElement("img")
        const settingsLabel = document.createElement("span")

        settingsButton.className = "sidebar-tab"

        settingsIcon.className = "nebula-icon-monochrome"

        settingsLabel.appendChild(document.createTextNode("Nebula"))

        settingsButton.addEventListener("click", () => {
            window.location.href = "https://playvortex.io/settings?vortexkitty=features_home";
        });

        settingsButton.setAttribute("data-tab", "Nebula")

        settingsSidebar.appendChild(settingsButton)
        settingsButton.appendChild(settingsIcon)
        settingsButton.appendChild(settingsLabel)
    }
}

applySettings()