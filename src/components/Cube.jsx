/* eslint-disable react/prop-types */
import { useStore } from '../hooks/useStore'
import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import * as textures from '../images/textures'

export const Cube = ({ id, position, texture }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube
  ])

  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }))

  const activeTexture = textures[texture + 'Texture']

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        const cubeFace = Math.floor(e.faceIndex / 2)
        const { x, y, z } = ref.current.position
        if (e.altKey) {
          return removeCube(id)
        }
        if (cubeFace === 0) {
          addCube(x + 1, y, z)
        }
        if (cubeFace === 1) {
          addCube(x - 1, y, z)
        }
        if (cubeFace === 2) {
          addCube(x, y + 1, z)
        }
        if (cubeFace === 3) {
          addCube(x, y - 1, z)
        }
        if (cubeFace === 4) {
          addCube(x, y, z + 1)
        }
        if (cubeFace === 5) {
          addCube(x - 1, y, z - 1)
        }
      }}
    >
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial
        color={isHovered ? 'grey' : 'white'}
        transparent
        map={activeTexture}
        attach='material'
      />
    </mesh>
  )
}
