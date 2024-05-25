import FooterButton from '../footerButton'
import '../../style/content.css'
import '../../style/foo.css'

export default function Online() {
    return (
        <div className='content'>
            <div className='main'>
                Online
            </div>
            <div id='footer'>
                <FooterButton value='Files' />
                <FooterButton value='Service' />
                <FooterButton value='Transfer' />
            </div>
        </div>
    )
}