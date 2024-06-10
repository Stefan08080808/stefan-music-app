import React from "react"

export type AudioComponentParams = {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>
    volume: number
    bass: number
    treble: number
}