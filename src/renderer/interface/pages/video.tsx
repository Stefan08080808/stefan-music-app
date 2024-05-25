import { useState } from 'react'

import FooterButton from '../footerButton'
import '../../style/content.css'
import '../../style/foo.css'

export default function Video() {
    const [isPlaying, setIsPlaying] = useState<'▶' | '■'>('▶')

    const togglePlay = () => {
        if (isPlaying === '▶') {
            setIsPlaying('■')
        } else {
            setIsPlaying('▶')
        }
    }

    return (
        <div className='content'>
            <div className='main'>
                Video
            </div>
            <div id='footer'>
                <FooterButton value='Video' />
                <FooterButton value={isPlaying} onClick={togglePlay} />
            </div>
        </div>
    )
}