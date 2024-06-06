import { Dispatch, SetStateAction, useEffect } from 'react'
import '../style/miniSelectorMenu.css'

export default function MiniSelectorMenu(props: {
    X: number,
    Y: number,
    W: number,
    H: number,
    options: string[],
    returnValue: any
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}) {
    const X = props.X
    const Y = props.Y
    const W = props.W
    const H = props.H
    const options = props.options
    const returnValue = props.returnValue
    const setIsMenuOpen = props.setIsMenuOpen

    return (
        <div>
            <div className='miniSelectorMenuContainer' onClick={() => setIsMenuOpen(false)}></div>
            <div className='miniSelectorMenu' style={{ top: Y, left: X, width: W, height: H }}>
                <div>
                    {options.map((option, index) => (
                        <div className='miniSelectorMenuOption' key={index} onClick={() => {
                            returnValue(option); setIsMenuOpen(false)
                        }}>{option.replace('.mp3' || '.wav' || '.m3u' || '.m3u8' || '.wma' || '.flac', '')}</div>
                    )).reverse()}
                </div>
            </div>
        </div>
    )
}