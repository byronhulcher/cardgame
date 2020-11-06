import React from 'react'

type IContinueBodyProps = {
  onContinue(): void
}

export const ContinueBody: React.FC<IContinueBodyProps> = ({
  children,
  onContinue
}) => {
  return (
    <div>
      <div>
        {children}
      </div>
      <div>
        <ul>
          <a onClick={onContinue}>
            <li>Continue</li>
          </a>
        </ul>
      </div>
    </div>
  )
}
