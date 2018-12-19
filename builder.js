const builder = require("electron-builder")
const Platform = builder.Platform

builder.build({
    targets: Platform.MAC.createTarget(),
    config: {
        mac: {
            appId: "com.chipi.client",
            category: "public.app-category.productivity",
            icon: "icons/icon.icns"
        }
    }
})
    .then(() => console.log('App build successfully'))
    .catch(err => console.error(err))