import { useEffect, useState } from 'react'
import FooterButton from '../footerButton'
import '../../style/content.css'
import '../../style/foo.css'
import { electron } from 'process'

export default function Audio() {
    const [musicFiles, setMusicFiles] = useState<string[]>([])

    useEffect(() => {
        const fetchMusicFiles = async () => {
            try {
                const songs = await window.electron.ipcRenderer.getMusicFiles()
                const constructedSongPaths = songs.map((song: string) => {
                    return song
                })

                setMusicFiles(constructedSongPaths)
            } catch (error) {
                console.error('Error loading music files:', error)
            }
        }

        fetchMusicFiles()
    }, [])

    const playAudio = async (file: string) => {
        const data = await window.electron.ipcRenderer.getMusicData(file)

        const player = document.querySelector('audio')!

        player.setAttribute('src', `data:audio/mpeg;base64,${data}`)
        player.play()
    }

    return (
        <div className='content'>
            <div className='main'>
                <ul>
                    {musicFiles.map((file, index) => (
                        <li key={index}>
                            <button onClick={() => playAudio(file)}>
                                {file}
                            </button>
                        </li>
                    ))}
                </ul>
                <audio src='' controls></audio>
            </div>
            <div id='footer'>
                <FooterButton value='MP3' />
                <FooterButton value='Folder' />
                <FooterButton value='Media' />
                <FooterButton value='Sound' />
            </div>
        </div>
    )
}
