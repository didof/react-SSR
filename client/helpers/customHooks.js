import { useState } from 'react'

export function useHandleInput(initialState) {
  const [value, setValue] = useState(initialState)

  function handleInput(event) {
    event.preventDefault()
    setValue(event.target.value)
  }

  return [value, handleInput]
}
