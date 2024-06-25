import './App.css'
import { useState, useEffect, useRef, useCallback } from 'react'

function App() {
  const [length, setLength] = useState<number>(8)
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false)
  const [characterAllowed, setCharacterAllowed] = useState<boolean>(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const passRef = useRef<HTMLTextAreaElement>(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += '1234567890'
    if (symbolsAllowed) str += '!@#$%^&*()_+'

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }
    setPassword(pass)
  }, [length, numberAllowed, symbolsAllowed])

  const copyPasteToClipBoard = () => {
    window.navigator.clipboard.writeText(password)
    passRef.current?.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, characterAllowed, symbolsAllowed, generatePassword])

  return (
    <div>
      <h2>Password Generator</h2>
      <div className='app'>
        <div className='form'>
          <textarea
            cols={30}
            rows={2}
            value={password}
            readOnly
            ref={passRef}
          ></textarea>
          <button type='button' onClick={copyPasteToClipBoard}>Copy</button>
        </div>

        <div className='options'>
          <div className='inputs'>
            <input
              type='range'
              value={length}
              max={100}
              min={3}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className='inputs'>
            <input
              type='checkbox'
              id='numbers'
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>

          <div className='inputs'>
            <input
              type='checkbox'
              id='symbols'
              checked={symbolsAllowed}
              onChange={(e) => setSymbolsAllowed((prev) => !prev)}
            />
            <label htmlFor="symbols">Include Symbols</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
