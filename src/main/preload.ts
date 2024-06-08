// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

export type Channels = 'closeApp' | 'minimiseApp' | 'refreshApp'

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel: Channels, ...args: unknown[]) {
            ipcRenderer.send(channel, ...args)
        },
        on(channel: Channels, func: (...args: unknown[]) => void) {
            const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
                func(...args)
            ipcRenderer.on(channel, subscription)

            return () => {
                ipcRenderer.removeListener(channel, subscription)
            }
        },
        once(channel: Channels, func: (...args: unknown[]) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args))
        },
        getMusicFiles: (location: 'AppData' | 'Music') => ipcRenderer.invoke('getMusicFiles', location),
        getMusicData: (song: string, location: 'AppData' | 'Music') => ipcRenderer.invoke('getMusicData', song, location),
        openExplorer: (location: 'AppData' | 'Music') => ipcRenderer.invoke('openExplorer', location),
    },
}

contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler