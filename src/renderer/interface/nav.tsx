import { useState, useEffect } from 'react'

import NavButton, { Tabs } from './navButton'

import '../style/nav.css'

import updateTimeUtil from './util/updateTimeUtil'
import navScrollUtil from './util/navScrollUtil'

export default function Nav(props: { selectedTab: Tabs, setSelectedTab: (tab: Tabs) => void }) {
    // Time Logic
    const [time, setTime] = useState<string>('00:00')
    setInterval(() => setTime(updateTimeUtil), 1000)

    // Tab Changing Logic
    const [isHoveringOnNav, setIsHoveringOnNav] = useState(false)
    const tabs: Tabs[] = ['Menu', 'Audio', 'Online', 'Video', 'System']

    const changeTab = (value: Tabs) => {
        if (value === props.selectedTab) return
        props.setSelectedTab(value)
    }

    useEffect(() => {
        const handleScrollEvent = (event: WheelEvent) => {
            navScrollUtil(event, { selectedTab: props.selectedTab, setSelectedTab: props.setSelectedTab, tabs: tabs })
        }

        if (isHoveringOnNav) document.body.addEventListener('wheel', handleScrollEvent)
        else document.body.removeEventListener('wheel', handleScrollEvent)

        return () => document.body.removeEventListener('wheel', handleScrollEvent)
    }, [props.selectedTab, isHoveringOnNav])

    // Application Window Logic
    const closeApp = () => window.electron.ipcRenderer.sendMessage('closeApp')
    const minimiseApp = () => window.electron.ipcRenderer.sendMessage('minimiseApp')

    let hasExpanded = false
    const expandAppView = () => {
        if (!hasExpanded) window.electron.ipcRenderer.sendMessage('expandAppView')
        else window.electron.ipcRenderer.sendMessage('retractAppView')
        hasExpanded = !hasExpanded
        console.log(hasExpanded)
    }

    return (
        <div id='nav'>
            {/* Top Section */}
            <div id='top'>

                {/* Time Section */}
                <div id='timeContainer'>
                    <p id='time'>{time}</p>
                </div>

                {/* Exit Button Section */}
                <p id='exitButton' onClick={expandAppView}>{'>'}</p>
                <p id='exitButton' onClick={minimiseApp}>_</p>
                <p id='exitButton' onClick={closeApp}>X</p>
            </div>

            {/* Bottom Section */}
            <div id='bottom' onMouseOver={() => setIsHoveringOnNav(true)} onMouseLeave={() => setIsHoveringOnNav(false)}>
                {tabs.map(tab => (
                    <NavButton
                        key={tab}
                        tabName={tab}
                        value={tab}
                        selectedTab={props.selectedTab}
                        onSelectTab={changeTab}
                    />
                ))}
            </div>
        </div>
    )
}