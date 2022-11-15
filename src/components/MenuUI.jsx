import { useStore } from '../hooks/useStore'

export const MenuUI = () => {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld
  ])

  return (
    <div className='menu-ui'>
      <button className='button-ui' onClick={saveWorld}>
        save
      </button>
      <button className='button-ui' onClick={resetWorld}>
        reset
      </button>
    </div>
  )
}
