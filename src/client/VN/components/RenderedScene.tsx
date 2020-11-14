import React from 'react'

import {
  Background,
  CharacterPosition,
  CharacterSprite,
  ISceneValues,
} from '../types'

export const RenderedScene: React.FC<ISceneValues> = ({
  background,
  dialog: {
    dialogBody,
    dialogSpeaker,
  },
  characters,
}) => {
  return (
    <div className="rendered-scene">
      <div className="rendered-scene--graphics">
        <div className="rendered-scene--background">
          {Background[background]}
        </div>
        <div className="rendered-scene--characters">
          {typeof characters[CharacterPosition.Left] !== "undefined" && (
            <div className="rendered-scene--characters--left">
              {CharacterSprite[characters[CharacterPosition.Left]]}
            </div>
          )}
          {typeof characters[CharacterPosition.Center] !== "undefined" && (
            <div className="rendered-scene--characters--center">
              {CharacterSprite[characters[CharacterPosition.Center]]}
            </div>
          )}
          {typeof characters[CharacterPosition.Right] !== "undefined" && (
            <div className="rendered-scene--characters--right">
              {CharacterSprite[characters[CharacterPosition.Right]]}
            </div>
          )}
        </div>
      </div>
      <div className="rendered-scene--dialog">
        {typeof dialogBody !== "undefined" && (
          <>
            {typeof dialogSpeaker !== "undefined" && (
              <div className="rendered-scene--dialog--speaker">
                {dialogSpeaker}
              </div>
            )}
            <div className="rendered-scene--dialog--body">
              {dialogBody}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
