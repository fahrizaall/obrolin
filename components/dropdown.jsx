import React, { useState } from 'react'
import { useOutsideClick } from '../hooks/helper';

export default function Dropdown({value, setSelected, selected, style}) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useOutsideClick(() => setIsOpen(false))
  
  return (
    <div className={`${style} relative bg-white p-1`} ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <p className='relative'>{selected} <span className={`absolute right-1 -translate-y-1 origin-center rotate-90 text-2xl  ${isOpen ? 'origin-center rotate-[270deg] right-3' : ''}`}>&#8250;</span></p>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} absolute z-10 bg-white drop-shadow-md py-2 left-0 -bottom-[7.5rem] w-full transition duration-300 ease-in-out`}>
        {value.map((val, i) => (
          <p key={i} onClick={() => { setSelected(val); setIsOpen(false)}} className='cursor-pointer px-2 hover:bg-slate-200'>{val}</p>
        ))}
      </div>
    </div>
  )
}
