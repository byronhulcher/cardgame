import React, {
  useState,
  useEffect,
} from 'react'

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

  for (let index = 0; index < base.length && index < match.length; index++) {
    if (base[index].toLowerCase() === match[index].toLowerCase()) {
      matched += base[index]
    } else {
      break
    }
  }

  return [
    matched,
    base.slice(matched.length),
  ]
}

export const HighlightMatchedText: React.FC<IHighlightMatchedTextProps> = ({
  dispalyedText,
  textToMatch,
}) => {
  const [
    matched,
    remaining,
  ] = splitStringOnMatch(dispalyedText, textToMatch)
  return (
    <span>
      <span className="highlighted">{matched}</span>
      <span className={textToMatch.length > matched.length ? "faded" : ""}>{remaining}</span>
    </span>
  )
}

type ITypingBodyProps = {
  choices: Choice[]
}

export const TypingBody: React.FC<ITypingBodyProps> = ({
  children,
  choices,
}) => {
  const [
    inputValue,
    setInputValue,
  ] = useState<string>('')

  useEffect(() => {
    const activeChoice = choices.find(choice => choice.text.toLowerCase() === inputValue.toLowerCase())
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
          {choices.map((choice) => (
            <li
              className="typing-boody--choice"
              key={choice.text}
            >
              <HighlightMatchedText
                dispalyedText={choice.text}
                textToMatch={inputValue}
              />
            </li>
          ))}
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
