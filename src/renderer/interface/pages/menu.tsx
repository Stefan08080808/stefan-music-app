import FooterButton from '../footerButton'
import '../../style/content.css'
import '../../style/foo.css'

export default function Menu() {
    return (
        <div className='content'>
            <div className='main'>
                Menu
            </div>
            <div id='footer'>
                <FooterButton value='Main Menu' />
            </div>
        </div>
    )
}