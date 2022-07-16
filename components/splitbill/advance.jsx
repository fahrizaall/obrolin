import React, { useEffect, useState } from 'react'
import { useFormatToCurrency, useOutsideClick } from '../../hooks/helper';

export default function Advance() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [inputTotalAmount, setInputTotalAmount] = useState(false);

  const [participant, setParticipant] = useState([
    {
      id: 'id' + new Date().getTime(),
      name: 'Participant 1',
      spend: 0,
      amountToPay: 0,
      amountToGet: 0,
    }
  ])
  
  const ref = useOutsideClick(() => setInputTotalAmount(false))

  const addParticipant = () => {
    const toPay = Math.round(totalAmount / (participant.length + 1))

    const updated = participant.map((participant) => ({
      ...participant,
      amountToPay: toPay,
      amountToget: toPay - spend
    }))

    let newParticipant = {
      id: 'id' + new Date().getTime(),
      name: `participant ${participant.length + 1}`,
      spend: 0,
      amountToPay: toPay,
      amountToGet: 0,
    }

    setParticipant([...updated, newParticipant])
  }

  const getTotalAmount = (data) => {
    let total = 0;

    data.map((data) => {
      total = total + parseInt(data.spend)
    })

    return total
  }

  const handleChangeValue = (e, id) => {
    const newSpend = parseInt(e.target.value)

    const updated = participant.map((participant) => {
      if (participant.id === id) {
        return {
          ...participant,
          spend: newSpend
        }
      } else return participant
    })

    const total = getTotalAmount(updated) 

    setParticipant(updated)
    setTotalAmount(total)
  }

  useEffect(() => {
    const updated = participant.map((data) => {
      let toPay = Math.round((totalAmount / participant.length) - data.spend)
      let toGet = Math.round(data.spend - (totalAmount / participant.length))

      if (toPay <= 0) toPay = 0;
      if (toGet <= 0) toGet = 0;

      console.log(parseInt(participant.length))
      return {
        ...data,
        amountToGet: toGet,
        amountToPay: toPay
      }
    })

    setParticipant(updated)
  }, [totalAmount])

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
          <div className='bg-white p-2 py-4 mb-2' key={participant.id}>
            <p className='text-slate-400 text-sm'>{participant.name}</p>
            <div className='flex justify-between mt-2'>
              <div className=''>
                <label htmlFor="spend" className='block text-blue-300 text-sm font-medium'>Spend</label>
                <span className='text-xl font-semibold text-blue-300'>Rp</span>
                <input type="number" id='spend' name='spend' className='w-24 mr-1 pr-2 px-1 border-b-[1px] text-blue-300 border-slate-400 text-xl font-semibold' value={participant.spend} onChange={(e) => handleChangeValue(e, participant.id)} />
                {participant.spend >= 0 ? '' : (
                  <p className='ml-2 text-xs font-semibold tracking-wide text-red-500'>minimum spend is Rp 0</p> 
                )}
              </div>
              <div>
                <div className='mb-4'>
                  <p className='block text-red-300 text-sm'>Amount to pay</p>
                  <p className='font-semibold text-red-300 text-lg'>{useFormatToCurrency(participant.amountToPay)}</p></div>
                <div>
                  <p className='block text-green-300 text-sm'>Amount to get</p>
                  <p className='font-semibold text-green-300 text-lg'>{useFormatToCurrency(participant.amountToGet)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className='w-full flex justify-end my-2 px-1'>
          <button className='font-semibold text-teal-500' onClick={() => addParticipant()}>+ add participant</button>
        </div>
      </div>
      
    </div>
  )
}
