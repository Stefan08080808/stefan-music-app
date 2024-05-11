import { useState } from 'react'

import { Tabs } from './interface/navButton'

import Nav from './interface/nav'
import Content from './interface/content'

import './style/app.css'

export default function App() {
    /**
     * The currently selected tab. Defaults to 'Menu'
     * @type {Tabs}
     */
    const [selectedTab, setSelectedTab] = useState<Tabs>('Menu')

    return (
        <>
            <div style={{ maxWidth: '1024px' }}>
                <Nav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <Content selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </div>
        </>
    )
}