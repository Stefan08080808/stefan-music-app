import React, { useState } from 'react'

const { ipcRenderer } = window.require("electron")

import '../style/nav.css'

export default function Nav() {
    const [time, setTime] = useState('00:00')

    const updateTime = () => {
        const date = new Date()

        let hour = String(date.getHours())
        let min = String(date.getMinutes())

        if (Number(hour) < 10) hour = `0${hour}`
        if (Number(min) < 10) min = `0${min}`

        return setTime(`${hour}:${min}`)
    }

    setInterval(updateTime, 1000)

    const closeApp = () => {
        ipcRenderer.send('close-app')
    }

    return (
        <div id='nav'>
            <div id='top'>
                <div id='timeContainer'>
                    <p id='time'>{time}</p>
                </div>
                <p id='exitButton' onClick={closeApp}>X</p>
            </div>
            <div id='bottom'>

            </div>
        </div>
    )
}