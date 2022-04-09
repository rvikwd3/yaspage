import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'

import Clock from './Clock'

jest
  .useFakeTimers()
  .setSystemTime(new Date('2022-09-04T12:12:00+05:30'))

test('Renders Clock', () => {
  render (
    <Clock />
  )

  const clockElement = screen.getByText('12:12')
  expect(clockElement).toBeDefined()
})