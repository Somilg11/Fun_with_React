import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_+=[]{}~`"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-center text-zinc-700 font-bold py-5 mt-40 mb-10'>Password Generator</h1>
      <div className='w-full max-w-[60vw] mx-auto rounded-lg px-4 my-8 text-orange-500 text-2xl'>
        <div className='flex rounded-lg overflow-hidden mb-9 bg-zinc-900 shadow-md px-4'>
          <input className='outline-none w-full py-3 px-3 my-3 rounded-lg bg-transparent' type="text" value={password} placeholder='password' readOnly ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} className='px-2 text-blue-800 font-semibold'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2 justify-between'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} /><label className='text-xl mx-2'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
              setNumberAllowed((prev) => !prev);
            }} /><label className='text-xl mx-2'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{
              setCharAllowed((prev) => !prev);
            }} /><label className='text-xl mx-2'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
