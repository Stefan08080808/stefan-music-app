import '../style/navButton.css'

export type Tabs = 'Menu' | 'Audio' | 'Online' | 'Video' | 'System'

export default function NavButton(props: { tabName: string, value: Tabs, selectedTab: Tabs, onSelectTab: (tab: Tabs) => void }) {
    return (
        <div className='navButton' onClick={() => props.onSelectTab(props.value)}>
            <p className='tabName' style={{ color: props.selectedTab === props.value ? '#ab8254' : '#777069' }}>{props.tabName}</p>
        </div>
    )
}