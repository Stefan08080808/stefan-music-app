import '../style/navButton.css'

export type Tabs = 'Menu' | 'Audio' | 'Online' | 'Video' | 'System'

export default function NavButton(props: { tabName: string, value: Tabs, selectedTab: Tabs, onSelectTab: (tab: Tabs) => void }) {
    return (
        <div className='navButton' onClick={() => props.onSelectTab(props.value)}>
            <p className={`tabName ${props.value === props.selectedTab ? 'selectedTab' : ''}`}>{props.tabName}</p>
        </div>
    )
}