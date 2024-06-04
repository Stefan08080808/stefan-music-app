/**
 * Utility responsible for scrolling through songs
 * @param event 
 * @param props 
 */
export default function songScrollUtil(event: WheelEvent, props: {
    songIndex: number,
    songCount: number
    setSongIndex: (index: number) => void,
}) {
    // Redecleration of props for cleaner look
    const songIndex = props.songIndex
    const songCount = props.songCount
    const setSongIndex = props.setSongIndex

    if (event.deltaY > 0) {
        if (songIndex < songCount - 1) {
            setSongIndex(songIndex + 1)
        }
    } else {
        if (songIndex > 0) {
            setSongIndex(songIndex - 1)
        }
    }
}