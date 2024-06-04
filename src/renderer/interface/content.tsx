// React
import React, { useState } from 'react'

// Components
import Menu from './pages/menu'
import Audio from './pages/audio'
import Online from './pages/online'
import Video from './pages/video'
import System from './pages/system'

// Types
import { Tabs } from '../types/Tabs'

export default function Content(props: { selectedTab: Tabs, setSelectedTab: (tab: Tabs) => void }) {
    const [loadedTabs, setLoadedTabs] = useState<{ [key in Tabs]?: boolean }>({
        Menu: true
    })

    if (!loadedTabs[props.selectedTab]) {
        setLoadedTabs(prev => ({ ...prev, [props.selectedTab]: true }))
    }

    return (
        <>
            {loadedTabs['Menu'] && <div style={{ display: props.selectedTab === 'Menu' ? 'block' : 'none' }}><Menu /></div>}
            {loadedTabs['Audio'] && <div style={{ display: props.selectedTab === 'Audio' ? 'block' : 'none' }}><Audio /></div>}
            {loadedTabs['Online'] && <div style={{ display: props.selectedTab === 'Online' ? 'block' : 'none' }}><Online /></div>}
            {loadedTabs['Video'] && <div style={{ display: props.selectedTab === 'Video' ? 'block' : 'none' }}><Video /></div>}
            {loadedTabs['System'] && <div style={{ display: props.selectedTab === 'System' ? 'block' : 'none' }}><System /></div>}
        </>
    )
}
