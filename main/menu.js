const path = require('path');
const { app, Tray, Menu } = require('electron');
const settings = require('./settings');
const { toggleWindow, showWindow } = require('./window');

function createMenu(mainWindow) {
    const tray = new Tray(path.join(__dirname, '../icons/tray/iconTemplate.png'));
    tray.setToolTip('Chipi');

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Toggle Chipi',
            // accelerator: settings.get('globalShortcut'),
            click() {
                toggleWindow(mainWindow);
            }
        },
        {
            label: 'Toggle Shortcut',
            submenu: [
                {
                    label: '1.',
                    accelerator: 'Control+Space',
                    type: 'radio',
                    checked: 'Control+Space' === settings.get('globalShortcut'),
                    click() {
                        settings.set('globalShortcut', 'Control+Space');
                    }
                },
                {
                    label: '2.',
                    accelerator: 'Control+Shift+Space',
                    type: 'radio',
                    checked: 'Control+Shift+Space' === settings.get('globalShortcut'),
                    click() {
                        settings.set('globalShortcut', 'Control+Shift+Space');
                    }
                }
            ]
        },
        {
            type: 'separator'
        },
        {
            label: 'Development',
            submenu: [
                {
                    role: 'toggleDevTools'
                },
                {
                    label: 'Hide Chipi on blur',
                    type: 'checkbox',
                    checked: settings.get('hideOnBlur'),
                    click(item) {
                        settings.set('hideOnBlur', item.checked);

                        if (!item.checked) {
                            showWindow(mainWindow);
                        }
                    }
                }
            ],
            click() {
                app.quit();
            }
        },
        {
            type: 'separator'
        },
        {
            role: 'quit'
        }
    ]);

    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);

    return tray;
}

module.exports = { createMenu };
