import React, { useEffect, useState } from 'react'
import Dropdown from '../components/dropdown'
import { Advance, Custom, Equal, Random } from '../components/splitbill'

export default function Splitbill() {
  const value = ['Equal Split', 'Custom Split', 'Random Split', 'Advance Split']
  const [type, setType] = useState('Equal Split')

  return (
    <div className='p-4 bg-slate-100 min-h-screen text-slate-800 '>
      <div className='md:w-1/4 md:min-w-[500px] m-auto'>
        <h1 className='font-bold text-3xl mb-4'>Split Bill</h1>

        <div className='mb-4'>
          <h2 className='mb-2'>Type</h2> 
          <Dropdown value={value} setSelected={(type) => setType(type)} selected={type} />
        </div>

        <div className='w-full  '>
          {type === value[0] ? (<Equal />)
            : type === value[1] ? (<Custom />)
              : type === value[2] ? (<Random />)
                : type === value[3] ? (<Advance />)
                  : ''}
        </div>
      </div>
    </div>
  )
}
