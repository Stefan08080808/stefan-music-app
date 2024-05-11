/**
 * Function that updates the time and returns it in the format "HH:MM"
 * @returns {string} 
 */
export default function updateTimeUtil(): string {
    const date = new Date()

    let hour = String(date.getHours())
    let min = String(date.getMinutes())

    if (Number(hour) < 10) hour = `0${hour}`
    if (Number(min) < 10) min = `0${min}`

    return `${hour}:${min}`
}