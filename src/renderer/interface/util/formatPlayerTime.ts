/**
 * Format seconds in minutes and seconds
 * in the format `HH...:SS`
 * @param time seconds
 * @returns 
 */
export default function formatPlayerTime(time: number): string {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}