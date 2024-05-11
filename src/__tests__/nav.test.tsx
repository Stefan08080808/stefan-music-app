import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Nav from '../renderer/interface/nav'

describe('Nav', () => {
    it('should render', () => {
        const { container } = render(<Nav />)
        expect(container).toBeInTheDocument()
    })

    it('should render 5 tab buttons', () => {
        const { container } = render(<Nav />)
        const buttons = container.getElementsByClassName('tabName')
        expect(buttons.length).toBe(5)
    })
})