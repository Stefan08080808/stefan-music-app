// React
import { useEffect, useState, useRef } from 'react'

// Components
import MiniSelectorMenu from '../miniSelectorMenu'
import FooterButton from '../footerButton'
import Spinner from '../spinner'
import Player from '../player'

// CSS
import '../../style/content.css'
import '../../style/audio.css'
import '../../style/foo.css'

// Utils
import formatPlayerTime from '../util/formatPlayerTime'

// Types
import { Range0To100 } from '../../types/Range'
import { PlayerMedium } from '../../types/Medium'

export default function Audio() {
    // Music States
    const [musicFiles, setMusicFiles] = useState<string[]>([])
    const [songCount, setSongCount] = useState<number>(0)
    const [songIndex, setSongIndex] = useState<number>(0)
    const [songProgressString, setSongProgressString] = useState<string>('00:00')
    const [songProgressInteger, setSongProgressInteger] = useState<Range0To100>(0)
    const [song, setSong] = useState<string>('')

    // Scrolling States
    const [isHoveringOnMain, setIsHoveringOnMain] = useState<boolean>(false)
    const [isReady, setIsReady] = useState<boolean>(false)
    const [isScrolling, setIsScrolling] = useState<boolean>(false)

    // Music Register Location States
    const [medium, setMedium] = useState<PlayerMedium>(localStorage.getItem('musicSrc')! as PlayerMedium)

    // Mini Selector Menu States
    const [isMediaMenuOpen, setIsMediaMenuOpen] = useState<boolean>(false)
    const [isMP3MenuOpen, setIsMP3MenuOpen] = useState<boolean>(false)
    const [isSoundMenuOpen, setIsSoundMenuOpen] = useState<boolean>(false)

    // Loading State
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // References
    const audioRef = useRef<HTMLAudioElement>(null)
    const latestRequestedSongIndex = useRef<number>(0)

    // Sound Settings
    const [bass, setBass] = useState<number>(0)
    const [treble, setTreble] = useState<number>(0)

    useEffect(() => {
        const medium: PlayerMedium | string = localStorage.getItem('musicSrc')!

        if ((medium as PlayerMedium) !== 'AppData'
            && (medium as PlayerMedium) !== 'Music') {
            localStorage.setItem('musicSrc', 'AppData')
        }
    }, [])

    /**
     * Fetches all music files from the main process and sets them in the state
     */
    const fetchMusicFiles = () => {
        return new Promise((resolve, reject) => {
            window.electron.ipcRenderer.getMusicFiles(medium)
                .then(songs => {
                    const constructedSongPaths = songs.map((song: string) => song)

                    setMusicFiles(constructedSongPaths)
                    setSongCount(songs.length)
                    setSongIndex(0)

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
                // Store the latest requested song index
                latestRequestedSongIndex.current = songIndex

                // Load data for the current song index
                const data = await window.electron.ipcRenderer.getMusicData(musicFiles[songIndex], medium)

                // Check if the latest requested song index has changed
                if (latestRequestedSongIndex.current === songIndex) {
                    audio.src = `data:audio/ogg;base64,${data}`
                    addAudioEventListeners()
                }
            } catch (error) {
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

        let lastSecond = 0 // Initialize lastSecond to an invalid value
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
        if (!audio) return

        const handleSongEnd = () => {
            if (songIndex >= songCount - 1) {
                setSongIndex(0)
            } else {
                setSongIndex(prevIndex => prevIndex + 1)
            }
        }

        audio.addEventListener('ended', handleSongEnd)

        return () => {
            audio.removeEventListener('ended', handleSongEnd)
        }
    }, [songIndex, songCount])


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

    const openExplorer = () => {
        window.electron.ipcRenderer.openExplorer(medium)
        window.electron.ipcRenderer.on('refreshApp', () => window.location.reload())
    }

    const changeMusic = async () => {
        setIsLoading(true)
        fetchMusicFiles()
        setTimeout(() => setIsLoading(false), 1000)
    }

    useEffect(() => {
        changeMusic()
        localStorage.setItem('musicSrc', medium)
    }, [medium])

    useEffect(() => {
        setSongIndex(musicFiles.indexOf(song))
    }, [song])

    return (
        <div className='content'>
            <div className='main' onMouseOver={() => setIsHoveringOnMain(true)} onMouseLeave={() => setIsHoveringOnMain(false)}>
                {isReady && musicFiles.length > 0 && ( // Conditional rendering based on isReady and musicFiles length
                    <Player
                        song={musicFiles[songIndex]?.slice(0, -4)}
                        medium={medium}
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
                <FooterButton value='MP3' onClick={() => setIsMP3MenuOpen(true)} />
                <FooterButton value='Folder' onClick={openExplorer} />
                <FooterButton value='Media' onClick={() => setIsMediaMenuOpen(true)} />
                <FooterButton value='Sound' onClick={() => setIsSoundMenuOpen(true)} />
            </div>
            <audio ref={audioRef} src='' controls id='player'></audio>

            {isMediaMenuOpen && (
                <MiniSelectorMenu X={391} Y={0} W={201} H={400}
                    options={['AppData', 'Music']} returnValue={setMedium}
                    setIsMenuOpen={setIsMediaMenuOpen} />
            )}

            {isMP3MenuOpen && (
                <MiniSelectorMenu X={20} Y={60} W={750} H={290}
                    options={musicFiles} returnValue={setSong}
                    setIsMenuOpen={setIsMP3MenuOpen} />
            )}

            {isSoundMenuOpen && (
                <div className='soundMenu'>
                    <div className="main-soundMenu">
                        <div className="setting-section">
                            <p className='sm-label'>Bass</p>
                            <p className='sm-value-label'>0</p>
                            <div className='sm-button-container'>
                                <button>-</button>
                                <button>+</button>
                            </div>
                        </div>
                        <div className="setting-section">
                            <p className='sm-label'>Trebble</p>
                            <p className='sm-value-label'>0</p>
                            <div className='sm-button-container'>
                                <button>-</button>
                                <button>+</button>
                            </div>
                        </div>
                        <div className="setting-section">
                            <p className='sm-label'>Volume</p>
                            <p className='sm-value-label'>0</p>
                            <div className='sm-button-container'>
                                <button>-</button>
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="footer-soundMenu">
                        <FooterButton value='Back' onClick={() => setIsSoundMenuOpen(false)} />
                    </div>
                </div>
            )}

            {isLoading && (
                <div className='loading'>
                    <div>
                        <h1>Loading...</h1>
                        <div className='spinnerContainer'>
                            <Spinner />
                        </div>
                    </div>
                </div>
            )}

            {songCount === 0 && (<p className='noSongs'>No Data</p>)}
        </div>
    )
}
