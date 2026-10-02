import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useReset = (field) => {
  const reset = () => {
    field.onChange({ target: { value: '' } })
  }

  return reset
}