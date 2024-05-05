import { useState, useEffect } from 'react'
import NavButton, { Tabs } from './navButton'
import '../style/nav.css'

export default function Nav() {
    // Time Logic
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

    // Tab Changing Logic
    const [selectedTab, setSelectedTab] = useState<Tabs>('Menu')
    const [isHoveringOnNav, setIsHoveringOnNav] = useState(false)

    const tabs: Tabs[] = ['Menu', 'Audio', 'Online', 'Video', 'System']

    const changeTab = (value: Tabs) => {
        if (value === selectedTab) return
        setSelectedTab(value)
        console.log(selectedTab)
    }

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (event.deltaY > 0) { // Scrolling down, select next tab
                const currentIndex = tabs.indexOf(selectedTab)
                if (currentIndex < tabs.length - 1) {
                    setSelectedTab(tabs[currentIndex + 1])
                }
            } else { // Scrolling up, select previous tab
                const currentIndex = tabs.indexOf(selectedTab)
                if (currentIndex > 0) {
                    setSelectedTab(tabs[currentIndex - 1])
                }
            }

            console.log(selectedTab)
        }

        if (isHoveringOnNav)
            document.body.addEventListener('wheel', handleScroll)
        else
            document.body.removeEventListener('wheel', handleScroll)

        return () => document.body.removeEventListener('wheel', handleScroll)
    }, [selectedTab, isHoveringOnNav])

    // Application Window Logic
    const closeApp = () => window.electron.ipcRenderer.sendMessage('closeApp')
    const minimiseApp = () => window.electron.ipcRenderer.sendMessage('minimiseApp')

    return (
        <div id='nav'>
            <div id='top'>
                <div id='timeContainer'>
                    <p id='time'>{time}</p>
                </div>
                <p id='exitButton' onClick={minimiseApp}>_</p>
                <p id='exitButton' onClick={closeApp}>X</p>
            </div>
            <div id='bottom' onMouseOver={() => setIsHoveringOnNav(true)} onMouseLeave={() => setIsHoveringOnNav(false)}>
                {tabs.map(tab => (
                    <NavButton
                        key={tab}
                        tabName={tab}
                        value={tab}
                        selectedTab={selectedTab}
                        onSelectTab={changeTab}
                    />
                ))}
            </div>
        </div>
    )
}