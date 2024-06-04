// Types
import { Tabs } from '../../types/Tabs'

export default function navScrollUtil(event: WheelEvent, props: {
    selectedTab: Tabs,
    tabs: Tabs[]
    setSelectedTab: (tab: Tabs) => void,
}) {
    // Redecleration of props for cleaner look
    const tabs = props.tabs
    const selectedTab = props.selectedTab
    const setSelectedTab = props.setSelectedTab

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
}
