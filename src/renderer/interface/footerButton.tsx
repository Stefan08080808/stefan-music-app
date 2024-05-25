export default function FooterButton(props: { value: string, onClick?: () => void }) {
    return <div className='footerButton' onClick={props.onClick}>{props.value}</div>
}