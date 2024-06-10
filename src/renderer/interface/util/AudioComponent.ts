import { useEffect, useRef } from 'react'
import { AudioComponentParams } from '../../types/AudioComponentParams'

const AudioComponent = ({ audioRef, volume, bass, treble }: AudioComponentParams) => {
    const audioContextRef = useRef<AudioContext | null>(null)
    const gainNodeRef = useRef<GainNode | null>(null)
    const bassFilterRef = useRef<BiquadFilterNode | null>(null)
    const trebleFilterRef = useRef<BiquadFilterNode | null>(null)

    useEffect(() => {
        if (audioRef.current && !audioContextRef.current) {
            const audioContext = new window.AudioContext()
            const source = audioContext.createMediaElementSource(audioRef.current)
            const gainNode = audioContext.createGain()

            source.connect(gainNode)
            gainNode.connect(audioContext.destination)

            audioContextRef.current = audioContext
            gainNodeRef.current = gainNode
        }

        return () => {
            audioContextRef.current?.close()
        }
    }, [])

    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = volume * 0.01
        }
    }, [volume])

    // Adjust the bass intensity when the bass prop changes
    useEffect(() => {
        if (audioContextRef.current && gainNodeRef.current) {
            const bassIntensity = mapBassIntensity(bass)
            if (!bassFilterRef.current) {
                const bassFilter = audioContextRef.current.createBiquadFilter()
                bassFilter.type = 'lowshelf'
                bassFilter.frequency.value = 200
                bassFilterRef.current = bassFilter
                gainNodeRef.current.disconnect()
                gainNodeRef.current.connect(bassFilter)
                bassFilter.connect(audioContextRef.current.destination)
            }
            bassFilterRef.current.gain.value = bassIntensity

            console.log('Updated bass to: ', bassIntensity)
        } else {
            console.log('Didn\'t update bass')
        }
    }, [bass])

    const mapBassIntensity = (bass: number) => {
        const minIntensity = -7.5
        const maxIntensity = 7.5
        return bass * (maxIntensity - minIntensity) / 10
    }

    // adjust trebble
    // Adjust the treble intensity when the treble prop changes
    useEffect(() => {
        if (audioContextRef.current && gainNodeRef.current) {
            const trebleIntensity = mapTrebleIntensity(treble)
            if (!trebleFilterRef.current) {
                const trebleFilter = audioContextRef.current.createBiquadFilter()
                trebleFilter.type = 'highshelf'
                trebleFilter.frequency.value = 4000 // Adjust the treble frequency as needed
                trebleFilterRef.current = trebleFilter
                gainNodeRef.current.disconnect()
                gainNodeRef.current.connect(trebleFilter)
                trebleFilter.connect(audioContextRef.current.destination)
            }
            trebleFilterRef.current.gain.value = trebleIntensity
        }
    }, [treble])

    const mapTrebleIntensity = (treble: number) => {
        const minIntensity = -7.5
        const maxIntensity = 7.5
        return treble * (maxIntensity - minIntensity) / 10
    }

    return null
}

export default AudioComponent