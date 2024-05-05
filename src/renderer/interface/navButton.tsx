import { useState } from 'react'
import '../style/navButton.css'

export type Tabs = 'Menu' | 'Audio' | 'Online' | 'Video' | 'System' | 'None'

export default function NavButton(props: { tabName: string, value: Tabs, selectedTab: Tabs, onSelectTab: (tab: Tabs) => void }) {
    return (
        <div>
            <p className='tabName' style={{ color: props.selectedTab === props.value ? '#ab8254' : '#777069' }} onClick={() => props.onSelectTab(props.value)}>{props.tabName}</p>
        </div>
    )
}