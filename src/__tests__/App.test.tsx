import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../renderer/App'

test('Render App', () => {
    const { container } = render(<App />)
    expect(container).toBeInTheDocument()
})
