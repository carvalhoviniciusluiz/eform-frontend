import { fireEvent, render, screen } from '@testing-library/react'
import * as faker from 'faker'
import { Accordion } from '@/presentation/components'

describe('Accordion Component', () => {
  test('should open accordion', () => {
    render(
      <Accordion title={faker.random.word()} isOpen={false}>
        <div />
      </Accordion>
    )

    const button = screen.getByTestId('accordion-button')
    const panel = screen.getByTestId('accordion-panel')

    fireEvent.click(button)

    expect(button).toHaveClass('active')
    expect(panel).toHaveClass('open')
  })
})
