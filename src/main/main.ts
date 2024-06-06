/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import { app, BrowserWindow, shell, ipcMain, protocol } from 'electron'
import { autoUpdater } from 'electron-updater'
import { resolveHtmlPath } from './util'
import log from 'electron-log'
import path from 'path'
import fs from 'fs'

class AppUpdater {
    constructor() {
        log.transports.file.level = 'info'
        autoUpdater.logger = log
        autoUpdater.checkForUpdatesAndNotify()
    }
}

let mainWindow: BrowserWindow | null = null

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support')
    sourceMapSupport.install()
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true'

if (isDebug) {
    require('electron-debug')()
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer')
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = ['REACT_DEVELOPER_TOOLS']

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload,
        )
        .catch(console.log)
}

const createWindow = async () => {
    if (isDebug) {
        await installExtensions()
    }

    const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets')

    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths)
    }

    mainWindow = new BrowserWindow({
        show: false,

        // Width
        width: 800,
        maxWidth: 800,
        minWidth: 800,

        // Height
        height: 400,
        maxHeight: 400,
        minHeight: 400,

        maximizable: false,
        minimizable: true,
        fullscreenable: false,
        resizable: false,
        frame: false,

        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
            nodeIntegration: true,
            contextIsolation: true,
            // webSecurity: false,
        },
    })

    mainWindow.loadURL(resolveHtmlPath('index.html'))

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined')
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize()
        } else {
            mainWindow.show()
        }
    })

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // const menuBuilder = new MenuBuilder(mainWindow)
    // menuBuilder.buildMenu()

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url)
        return { action: 'deny' }
    })

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater()
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady()
    .then(() => {
        createWindow()
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow()
        })
    })
    .catch(console.log)

// Custom IPC handlers
ipcMain.on('closeApp', () => app.quit())
ipcMain.on('minimiseApp', () => mainWindow?.minimize())

const appDataFolder = app.getPath('appData')
const musicFolder = app.getPath('music')

ipcMain.handle('getMusicFiles', (_, location: 'AppData' | 'Music') => {
    if (location === 'AppData') {
        return fs.readdirSync(`${appDataFolder}\\Stefan Music App`)
    } else if (location === 'Music') {
        return fs.readdirSync(musicFolder)
    } else {
        throw new Error('Invalid location')
    }
})

ipcMain.handle('getMusicData', async (_, song, location) => {
    try {
        let data = null
        if (location === 'AppData') {
            data = await fs.promises.readFile(`${appDataFolder}\\Stefan Music App\\${song}`)
        } else if (location === 'Music') {
            data = await fs.promises.readFile(`${musicFolder}\\${song}`)
        }
        const base64Data = data!.toString('base64')
        return base64Data
    } catch (error) {
        console.error('Error reading music file:', error)
        return null
    }
})

ipcMain.handle('openExplorer', (_, location: 'AppData' | 'Music') => {
    if (location === 'AppData') {
        shell.openPath(`${appDataFolder}\\Stefan Music App\\`)
    } else if (location === 'Music') {
        shell.openPath(`${musicFolder}\\`)
    } else {
        throw new Error('Invalid location')
    }
})

if (fs.readdirSync(appDataFolder).includes('Stefan Music App') === false) {
    fs.mkdirSync(`${appDataFolder}\\Stefan Music App`)
}