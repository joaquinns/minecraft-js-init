import { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyboard } from '../hooks/useKeyboard'

export const Player = () => {
  const { up, right, down, left, jump } = useKeyboard()

  const { camera } = useThree()

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 1, 0]
  }))

  const pos = useRef([0, 0, 0])
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p
    })
  }, [api.position])

  const vel = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v
    })
  }, [api.velocity])

  useFrame(() => {
    camera.position.copy(
      new Vector3(
        pos.current[0], // x
        pos.current[1], // y
        pos.current[2] // z
      )
    )

    const direction = new Vector3()

    const frontVector = new Vector3(0, 0, (down ? 1 : 0) - (up ? 1 : 0))

    const sideVector = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0)

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(3.5) // walk: 2, run: 5
      .applyEuler(camera.rotation)

    api.velocity.set(
      direction.x,
      vel.current[1], // ???? saltar.
      direction.z
    )

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], 3, vel.current[2])
    }
  })

  return <mesh ref={ref} />
}
