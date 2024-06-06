import { useState, useEffect } from 'react'
import '../style/spinner.css'

export default function Spinner() {
    const [percent, setPercent] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (percent < 100) setPercent(percent + 15)
            else setPercent(0)
        }, 500)
        return () => clearInterval(interval)
    })

    return (
        <div className="spinner">
            <div className="spinner-fill"
                style={{
                    background: `conic-gradient(#ab8254 ${percent}%, #0000 ${percent}%)`
                }}></div>
        </div>
    )
}