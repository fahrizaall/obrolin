import React, { useEffect, useState } from 'react'
import { useFormatToCurrency, useOutsideClick } from '../../hooks/helper';

export default function Custom() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotalAmount, setInputTotalAmount] = useState(false);
  const [totalPrecentage, setTotalPrecentage] = useState(0);

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
    let newParticipant = {
      id: 'id' + new Date().getTime(),
      name: `participant ${participant.length + 1}`,
      precentage: 0,
      amountToPay: 0,
    }

    setParticipant([...participant, newParticipant])
  }

  const changePrecentage = (e, id) => {
    const newPrecentage = parseInt(e.target.value)

    const updated = participant.map((participant) => {
      if (participant.id === id) {
        return {
          ...participant,
          precentage: newPrecentage,
          amountToPay: Math.round(totalAmount * newPrecentage / 100)
        }
      } else return participant
    })

    setParticipant(updated)
  }

  useEffect(() => {
    const updated = participant.map((participant) => ({
      ...participant,
      amountToPay: Math.round(totalAmount * participant.precentage / 100)
    }))
    
    setParticipant(updated)
    
  }, [totalAmount])

  useEffect(() => {
    let total = 0;

    participant.map((participant) => {
      total = total + parseInt(participant.precentage)
    })

    setTotalPrecentage(total)
    console.log(total)
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
              <input type="number" className='text-right w-9 md:w-14 md:px-0 mr-1 bg-slate-100 px-1' value={participant.precentage} onChange={(e) => changePrecentage(e, participant.id) } /><span>%</span>
            </div>
            <div>
              <p className='font-semibold text-lg'>{useFormatToCurrency(participant.amountToPay)}</p>
            </div>
          </div>
        ))}
        
        <div className='w-full flex justify-between my-2 px-1'>
          {totalPrecentage ? (
            <p className={`ml-2 text-xs font-semibold tracking-wide ${totalPrecentage == 100 ? 'text-green-500' : 'text-red-500'}`}>total precentage <br />
              <span className='font-semibold'>{totalPrecentage}%</span>
            </p>
          ) : (
            <p className='ml-2 text-xs font-semibold tracking-wide text-red-500'>at least put 0%</p> 
          )}
          <button className='font-semibold text-teal-500' onClick={() => addParticipant()}>+ add participant</button>
        </div>
      </div>
      
    </div>
  )
}
