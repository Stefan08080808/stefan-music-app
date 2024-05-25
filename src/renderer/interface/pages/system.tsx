import FooterButton from '../footerButton'
import '../../style/content.css'

export default function System() {
    return (
        <div className='content'>
            <div className='main'>
                System
            </div>
            <div id='footer'>
                <FooterButton value='Settings' />
                <FooterButton value='Import/Export' />
                <FooterButton value='Help' />
            </div>
        </div>
    )
}