import React from 'react'

type Choice = {
  content: React.ReactNode
  onClick()
}

type IChoiceBodyProps = {
  choices: Choice[]
}

export const ChoiceBody: React.FC<IChoiceBodyProps> = ({
  children,
  choices,
}) => {
  return (
    <div>
      <div>
        {children}
      </div>
      <div>
        <ul>
          {choices.map(({
            content,
            onClick,
          }) => (
            <a
              key={content.toString()}
              onClick={onClick}
            >
              <li>{content}</li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  )
}
