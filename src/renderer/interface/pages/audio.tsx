// React
import { useEffect, useState } from 'react'

// Components
import FooterButton from '../footerButton'
import Player from '../player'

// CSS
import '../../style/content.css'
import '../../style/foo.css'

// Utils
import formatPlayerTime from '../util/formatPlayerTime'

// Types
import { Range0To100 } from '../../types/Range'

export default function Audio() {
    // Music States
    const [musicFiles, setMusicFiles] = useState<string[]>([])
    const [songCount, setSongCount] = useState<number>(0)
    const [songIndex, setSongIndex] = useState<number>(0)
    const [songProgressString, setSongProgressString] = useState<string>('00:00')
    const [songProgressInteger, setSongProgressInteger] = useState<Range0To100>(0)

    // Scrolling States
    const [isHoveringOnMain, setIsHoveringOnMain] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)
    const [isScrolling, setIsScrolling] = useState<boolean>(false)

    /**
     * Fetches all music files from the main process and sets them in the state
     * @returns {Promise<void>}
     */
    const fetchMusicFiles = () => {
        return new Promise((resolve, reject) => {
            window.electron.ipcRenderer.getMusicFiles()
                .then(songs => {
                    const constructedSongPaths = songs.map((song: string) => song)

                    setMusicFiles(constructedSongPaths)
                    setSongCount(songs.length)

                    setTimeout(() => {
                        setIsReady(true)
                        resolve(true)
                    }, 500)
                })
                .catch(error => {
                    console.error('Error loading music files:', error)
                    reject(error)
                })
        })
    }

    // fetch music files initially
    useEffect(() => {
        fetchMusicFiles()
    }, [])

    // load song from index
    useEffect(() => {
        /**
         * Grabs the audio element from the DOM
         */
        const audio = document.getElementById('player') as HTMLAudioElement

        const loadSongFromIndex = async () => {
            if (!isReady || musicFiles.length === 0) return

            try {
                const data = await window.electron.ipcRenderer.getMusicData(musicFiles[songIndex])
                audio.src = `data:audio/ogg;base64,${data}`
                addAudioEventListeners()
            } catch (error) {
                console.error('Error loading music data:', error)
            }
        }

        const addAudioEventListeners = () => {
            audio.addEventListener('canplay', () => {
                audio.play().catch(error => {
                    console.error('Error playing audio:', error)
                })
                initializeSongProgress()
            }, { once: true })
        }

        let lastSecond = -1 // Initialize lastSecond to an invalid value
        const initializeSongProgress = () => {
            audio.addEventListener('timeupdate', updateSongProgress)
        }

        const updateSongProgress = () => {
            const currentSecond = Math.floor(audio.currentTime)

            // Update progress only if the second changes
            if (currentSecond !== lastSecond) {
                setSongProgressString(formatPlayerTime(currentSecond))

                const progressPercentage = (currentSecond / audio.duration) * 100
                setSongProgressInteger(Math.floor(progressPercentage) as Range0To100)

                lastSecond = currentSecond
            }
        }

        loadSongFromIndex()
    }, [isReady, musicFiles, songIndex])

    // Check if song has finished playing
    useEffect(() => {
        const audio = document.getElementById('player') as HTMLAudioElement

        audio.addEventListener('ended', () => {
            if (songIndex + 1 < songCount)
                setSongIndex(songIndex + 1)
            else
                setSongIndex(0)
        })
    }, [])

    // use arrow keys to go forwards and backwards 5s in the song
    useEffect(() => {
        const audio = document.getElementById('player') as HTMLAudioElement

        const onKeyDown = (event: KeyboardEvent) => {
            if (isScrolling) return
            if (event.key === 'ArrowLeft') {
                audio.currentTime = (audio.currentTime - 5)
            } else if (event.key === 'ArrowRight') {
                audio.currentTime = (audio.currentTime + 5)
            }
        }

        document.addEventListener('keydown', onKeyDown)
    }, [])

    return (
        <div className='content'>
            <div className='main' onMouseOver={() => setIsHoveringOnMain(true)} onMouseLeave={() => setIsHoveringOnMain(false)}>
                {isReady && musicFiles.length > 0 && ( // Conditional rendering based on isReady and musicFiles length
                    <Player
                        song={musicFiles[songIndex]?.slice(0, -4)}
                        medium='MP3 Register'
                        songCount={songCount}
                        songIndex={songIndex}
                        songProgessString={songProgressString}
                        songProgressInteger={songProgressInteger}
                        isHoveringOnMain={isHoveringOnMain}
                        setSongIndex={setSongIndex}
                        setIsScrolling={setIsScrolling}
                    />
                )}
            </div>
            <div id='footer'>
                <FooterButton value='MP3' />
                <FooterButton value='Folder' />
                <FooterButton value='Media' />
                <FooterButton value='Sound' />
            </div>
            <audio src='' controls id='player'></audio>
        </div>
    )
}
