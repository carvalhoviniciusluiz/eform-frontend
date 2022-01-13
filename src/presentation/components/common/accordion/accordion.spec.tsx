import { fireEvent, render, screen } from '@testing-library/react'
import * as faker from 'faker'
import { Accordion } from '@/presentation/components'

const makeSut = (isOpen = false): void => {
  render(
    <Accordion title={faker.random.word()} isOpen={isOpen}>
      <div />
    </Accordion>
  )
}

describe('Accordion Component', () => {
  test('should open accordion', () => {
    makeSut()
    const button = screen.getByTestId('accordion-button')
    const panel = screen.getByTestId('accordion-panel')
    fireEvent.click(button)
    expect(button).toHaveClass('active')
    expect(panel).toHaveClass('open')
  })
})
