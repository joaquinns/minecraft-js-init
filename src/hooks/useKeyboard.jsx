import { useState, useEffect } from 'react'

const KEYBOARD_ACTIONS = {
  KeyW: 'up',
  KeyD: 'right',
  KeyS: 'down',
  KeyA: 'left',
  Space: 'jump',
  Digit1: 'wood',
  Digit2: 'dirt',
  Digit3: 'glass',
  Digit4: 'log',
  Digit5: 'grass'
}

export const useKeyboard = () => {
  const [action, setAction] = useState({
    up: false,
    right: false,
    down: false,
    left: false,
    jump: false,
    dirt: false,
    glass: false,
    grass: false,
    wood: false,
    log: false
  })

  useEffect(() => {
    const handleKeyDown = (evt) => {
      const { code } = evt
      const action = KEYBOARD_ACTIONS[code]
      console.log(action)
      if (action) {
        setAction((prevActions) => ({ ...prevActions, [action]: true }))
      }
    }

    const handleKeyUp = (evt) => {
      const { code } = evt
      const action = KEYBOARD_ACTIONS[code]
      console.log(action)
      if (action) {
        setAction((prevActions) => ({ ...prevActions, [action]: false }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return action
}
