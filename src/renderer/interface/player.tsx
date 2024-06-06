// React
import { useEffect, useRef } from 'react'

// Components
import songScrollUtil from './util/songScrollUtil'

// CSS
import '../style/player.css'

// Types
import { Range0To100 } from '../types/Range'
import { PlayerMedium } from '../types/Medium'

/**
 * The main Player Element with the slithers, progress bar,
 * name indicator, etc.
 * @param props Properties
 * @returns Player Element
 */
export default function Player(props: {
    // Song data
    song: string
    songCount: number
    songIndex: number
    songProgessString: string
    songProgressInteger: Range0To100
    setSongIndex: (index: number) => void

    // Mouse State
    isHoveringOnMain: boolean
    setIsScrolling: (value: boolean) => void

    // Storage Medium
    medium: PlayerMedium
}) {
    // Redecleration of props for cleaner look
    const song = props.song
    const songCount = props.songCount
    const songIndex = props.songIndex
    const songProgessString = props.songProgessString
    const songProgressInteger = props.songProgressInteger
    const isHoveringOnMain = props.isHoveringOnMain
    const medium = props.medium

    const setSongIndex = props.setSongIndex
    const setIsScrolling = props.setIsScrolling

    // refs
    const slithersContainerRef = useRef<HTMLDivElement>(null)
    const scrollTimeoutRef = useRef<NodeJS.Timeout>()

    /**
     * Sets the `className` Property to the active slither, representing
     * the song that is currently playing
     * @param index The index of the slither that should be active
     */
    const setActiveSlither = (index: number) => {
        const slithers = slithersContainerRef.current?.querySelectorAll('.slither')

        if (slithers) {
            slithers.forEach((slither, slitherIndex) => {
                slither.classList.toggle('selectedSlither', slitherIndex === index)
            })
            setSongIndex(index)
        }
    }

    // Set initial slither
    useEffect(() => {
        setActiveSlither(songIndex)
    }, [songIndex])

    // Create slithers
    useEffect(() => {
        const slithersContainer = slithersContainerRef.current as HTMLDivElement

        // Function to create slithers
        const createSlithers = () => {
            // Create a new array of slither elements
            const newSlithers = Array.from({ length: songCount }, (_, i) => {
                const slither = document.createElement('div')
                slither.setAttribute('class', 'slither')
                slither.addEventListener('click', () => setActiveSlither(i))
                return slither
            })

            // Clear the container and append the new slithers
            slithersContainer.innerHTML = ''
            newSlithers.forEach(slither => slithersContainer.appendChild(slither))

            // Set active slither
            setActiveSlither(songIndex)
        }

        // Call createSlithers function
        if (slithersContainer) {
            createSlithers()
        }
    }, [songCount, songIndex])


    /**
     * Scrolls the player when the user scrolls the mouse wheel
     */
    useEffect(() => {
        const handleScrollEvent = (event: WheelEvent) => {
            songScrollUtil(event, {
                songIndex: songIndex,
                setSongIndex: setSongIndex,
                songCount: songCount
            })

            setIsScrolling(true)
            clearTimeout(scrollTimeoutRef.current)

            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false)
            }, 1000)
        }

        if (isHoveringOnMain) {
            const body = document.body

            body.addEventListener('wheel', handleScrollEvent)
            return () => body.removeEventListener('wheel', handleScrollEvent)
        }
    }, [isHoveringOnMain, songIndex, songCount, setSongIndex, setIsScrolling])

    return (
        <div className='playerContainer'>
            <div className='playerContainerMainOuter'>
                <div className='playerContainerMainInner'>
                    <div className="mainPlayerContainer">
                        <div className="songStrip">{songIndex + 1} {song}</div>
                        <div className="progressStrip">
                            <div className="progressStripInner"
                                style={{ width: `${songProgressInteger}%` }}></div>
                        </div>
                        <div className="slithersContainer" ref={slithersContainerRef}></div>
                    </div>
                    <div className="mediumStrip">
                        <p>{medium}</p>
                    </div>
                </div>
            </div>
            <p className='timer'>{songProgessString}</p>
        </div>
    )
}
