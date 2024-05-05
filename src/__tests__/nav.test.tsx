import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Nav from '../renderer/interface/nav'

describe('Nav', () => {
    it('should render', () => {
        render(<Nav />)
        const navElement = screen.getByTestId('nav')
        expect(navElement).toBeInTheDocument()
    })

    it('should render 5 tab buttons', () => {
        render(<Nav />)
        const tabs = screen.getAllByText('Menu' || 'Audio' || 'Online' || 'Video' || 'System')
        expect(tabs).toHaveLength(6)
    })
})