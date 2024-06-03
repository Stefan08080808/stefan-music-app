import FooterButton from '../footerButton'
import '../../style/main.css'
import '../../style/content.css'
import '../../style/foo.css'

export default function Menu() {
    return (
        <div className='content'>
            <div className='main'>
                <p>Programmed by Stefan Denis</p>
                <p>V1.0.0</p>
                <hr />
            </div>
            <div id='footer'>
                <FooterButton value='Audio' />
                <FooterButton value='Online' />
                <FooterButton value='Video' />
                <FooterButton value='System' />
            </div>
        </div>
    )
}