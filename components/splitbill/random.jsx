import React, { useEffect, useState } from 'react'
import { shuffleArray, useFormatToCurrency, useOutsideClick } from '../../hooks/helper';

export default function Random() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotalAmount, setInputTotalAmount] = useState(false);
  const [totalPrecentage, setTotalPrecentage] = useState(0);
  const [precetages, setPrecentages] = useState([0])

  const [participant, setParticipant] = useState([
    {
      id: 'id' + new Date().getTime(),
      name: 'Participant 1',
      precentage: 0,
      amountToPay: 0,
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
    setPrecentages([...precetages, 0])
  }

  const changePrecentages = (e, i) => {
    let newPrecentage = parseInt(e.target.value)
    
    const updated = [...precetages]
    updated[i] = newPrecentage

    setPrecentages(updated)
  }

  const spliitTheBill = () => {
    const precentages = shuffleArray(precetages)

    const updated = participant.map((participant, i) => ({
      ...participant,
      precentage: precentages[i],
      amountToPay: Math.round(totalAmount * precentages[i] / 100)     
    }))

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

    precetages.map((precentage) => {
      total = total + parseInt(precentage)
    })

    setTotalPrecentage(total)
  }, [precetages])

  useEffect(() => {
    console.log(precetages)
  }, [precetages])

  return (
    <div className='relative'>
      <div className='mb-4'>
        <h2 className=''>Total amount</h2>
        {!inputTotalAmount ?
          (<p className='font-semibold text-2xl text-right' onClick={() => setInputTotalAmount(true)}>{useFormatToCurrency(totalAmount)}</p>)
            : (<input type="number" className='w-full p-2' value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} ref={ref} />)}
        
      </div>

      <div className='mb-4'>
        <h2 className='mb-2'>Precentage</h2>
        
        <div className='w-full flex flex-wrap mb-2'>
          {precetages.map((precentage, i) => (
            <div className='w-1/4 px-1 mb-2' key={i}>
              <input type="number" className='w-3/4 px-2 md:px-0 text-right' value={precentage} onChange={(e) => changePrecentages(e, i)} /> <span>%</span>
            </div>
          ))}
        </div>

        {totalPrecentage >= 0 ? (
          <p className={`ml-2 text-xs font-semibold tracking-wide ${totalPrecentage == 100 ? 'text-green-500' : 'text-red-500'}`}>total precentage <br />
            <span className='font-semibold'>{totalPrecentage}%</span>
          </p>
        ) : (
          <p className='ml-2 text-xs font-semibold tracking-wide text-red-500'>at least put 0%</p> 
        )}
      </div>

      <div className='pb-28'>
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
        
        <div className='w-full flex justify-end my-2 px-1'>
          <button className='font-semibold text-teal-500' onClick={() => addParticipant()}>+ add participant</button>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 p-4 w-full md:w-[500px] md:left-auto md:px-0'>
        <button className='w-full bg-teal-400 py-3 font-bold text-white' onClick={() => spliitTheBill()}>Split The Bill</button>
      </div>
      
    </div>
  )
}
