import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'

import Nav from './interface/nav'
import Footer from './interface/foo'

import './style/app.css'

export default function App() {
    return (
        <div>
            <Nav />
            <div id='content' />
            <Footer />
        </div>
    )
}
