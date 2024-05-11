import { Tabs } from '../navButton'

export default function navScrollUtil(event: WheelEvent, props: { selectedTab: Tabs, setSelectedTab: (tab: Tabs) => void, tabs: Tabs[] }) {
    const tabs = props.tabs
    if (event.deltaY > 0) { // Scrolling down, select next tab
        const currentIndex = tabs.indexOf(props.selectedTab)
        if (currentIndex < tabs.length - 1) {
            props.setSelectedTab(tabs[currentIndex + 1])
        }
    } else { // Scrolling up, select previous tab
        const currentIndex = tabs.indexOf(props.selectedTab)
        if (currentIndex > 0) {
            props.setSelectedTab(tabs[currentIndex - 1])
        }
    }
}
