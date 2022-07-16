import React, { useEffect, useState } from 'react'
import { useFormatToCurrency, useOutsideClick } from '../../hooks/helper';

export default function Equal() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotalAmount, setInputTotalAmount] = useState(false)

  const [participant, setParticipant] = useState([
    {
      id: 'id' + new Date().getTime(),
      name: 'Participant 1',
      precentage: 100,
      amountToPay: totalAmount,
    }
  ])

  const ref = useOutsideClick(() => setInputTotalAmount(false))

  const addParticipant = () => {
    const newPrecentage = Math.round(100 / (participant.length + 1))
    const newPayAmount = Math.round(totalAmount / (participant.length + 1))

    const updated = participant.map((participant) => ({
      ...participant,
      precentage: newPrecentage,
      amountToPay: newPayAmount
    }))

    let newParticipant = {
      id: 'id' + new Date().getTime(),
      name: `participant ${participant.length + 1}`,
      precentage: newPrecentage,
      amountToPay: newPayAmount,
    }

    setParticipant([...updated, newParticipant])
  }

  useEffect(() => {
    const newPrecentage = Math.round(100 / (participant.length))
    const newPayAmount = Math.round(totalAmount / (participant.length))
    
    const updated = participant.map((participant) => ({
      ...participant,
      precentage: newPrecentage,
      amountToPay: newPayAmount
    }))
    
    setParticipant(updated)
    
  }, [totalAmount])

  useEffect(() => {
    console.log(participant)
  }, [participant])

  return (
    <div className=''>
      <div className='mb-4'>
        <h2 className=''>Total amount</h2>
        {!inputTotalAmount ?
          (<p className='font-semibold text-2xl text-right' onClick={() => setInputTotalAmount(true)}>{useFormatToCurrency(totalAmount)}</p>)
            : (<input type="number" className='w-full p-2' value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} ref={ref} />)}
        
      </div>

      <div className='mb-4'>
        <h2 className='mb-2'>Participant</h2>

        {participant.map(participant => (
          <div className='flex justify-between items-center bg-white p-2 mb-2' key={participant.id}>
            <div>
              <p className='text-slate-400 text-sm'>{participant.name}</p>
              <p className='font-semibold text-lg px-2'>{participant.precentage}%</p>
            </div>
            <div>
              <p className='font-semibold text-lg'>{useFormatToCurrency(participant.amountToPay)}</p>
            </div>
          </div>
        ))}
        
        <div className='w-full flex justify-between my-2'>
          <p></p>
          <button className='font-semibold text-teal-500' onClick={() => addParticipant()}>+ add participant</button>
        </div>
      </div>
      
    </div>
  )
}
