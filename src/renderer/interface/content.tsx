import { Tabs } from './navButton'

import Menu from './pages/menu'
import Audio from './pages/audio'
import Online from './pages/online'
import Video from './pages/video'
import System from './pages/system'

export default function Content(props: { selectedTab: Tabs, setSelectedTab: (tab: Tabs) => void }) {
    const renderContent = () => {
        switch (props.selectedTab) {
            case 'Menu':
                return <Menu />
            case 'Audio':
                return <Audio />
            case 'Online':
                return <Online />
            case 'Video':
                return <Video />
            case 'System':
                return <System />
            default:
                return null
        }
    }

    return renderContent()
}
