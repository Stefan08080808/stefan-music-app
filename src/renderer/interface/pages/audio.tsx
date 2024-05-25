import FooterButton from '../footerButton'
import '../../style/content.css'
import '../../style/foo.css'

export default function Audio() {
    return (
        <div className='content'>
            <div className='main'>
                Audio
            </div>
            <div id='footer' >
                <FooterButton value='MP3' />
                <FooterButton value='Folder' />
                <FooterButton value='Media' />
                <FooterButton value='Sound' />
            </div>
        </div>
    )
}