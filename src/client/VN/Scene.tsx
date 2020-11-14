import React, { useEffect } from 'react'

import {
  useActions,
  useAllValues
} from 'kea'

import { SceneLogic } from './SceneLogic'
import { useSceneQueue } from './SceneQueue'
import { stageTestScene } from './TestSceneWithManager'
import {
  ISceneActions,
  ISceneValues
} from './types'
import { Menu } from './components/Menu'
import { DebugScene } from './components/DebugScene'

export const Scene: React.FC = () => {
  const sceneActions = useActions(SceneLogic) as ISceneActions

  const sceneValues = useAllValues(SceneLogic) as ISceneValues

  const sceneQueue = useSceneQueue(sceneActions)

  const {
    empty,
    popUntilStop,
  } = sceneQueue

  const restartScene = () => {
    empty()
    stageTestScene(sceneQueue)
    popUntilStop()
  }

  useEffect(restartScene, [])

  return (
    <>
      <h1>VN Prototype</h1>
      <DebugScene {...sceneValues} />
      <Menu restartScene={restartScene} />
    </>
  )
}
