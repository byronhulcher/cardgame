import React, { useState, useEffect } from 'react'

type Choice = {
  text: string
  action: () => void
}

type IHighlightMatchedTextProps = {
  dispalyedText: string
  textToMatch: string
}

const splitStringOnMatch = (base: string, match: string): [string, string] => {
  let matched = ""
  for (let index; index < base.length; index++) {
    if (base[index] === match[index]) {
      matched += base[index]
    } else {
      break
    }
  }
  return [matched, base.slice(matched.length)]
}

export const HighlightMatchedText: React.FC<IHighlightMatchedTextProps> = ({
  dispalyedText,
  textToMatch
}) => {
  const [matched, remaining] = splitStringOnMatch(dispalyedText, textToMatch)
  return (
    <span><span color="green">{matched}</span>{remaining}</span>
  )
}

type IContinueBodyProps = {
  choices: Choice[]
}

export const ChoiceBody: React.FC<IContinueBodyProps> = ({
  children,
  choices
}) => {
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    const activeChoice = choices.find(choice => choice.text === inputValue)
    if (activeChoice) {
      activeChoice.action()
    }
  }, [inputValue])

  return (
    <div className="typing-body">
      <div>
        {children}
      </div>
      <div>
        <ul>
          {
            choices.map((choice) => (
              <li
                className="typing-boody--choice"
                key={choice.text}
              >
                {choice.text}
              </li>
            ))
          }
        </ul>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          autoFocus
        />
      </div>
    </div>
  )
}
