import React, { useEffect, useRef } from 'react'

export const useOutsideClick = (callback) => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref])

  return ref
}

export const useFormatToCurrency = (amount) => {
  return "Rp " + amount.toString().replace(/\d(?=(\d{3})+$)/g, "$&,");
};

export const shuffleArray = (array) => {
for (var i = array.length - 1; i > 0; i--) {

	// Generate random number
	var j = Math.floor(Math.random() * (i + 1));
				
	var temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}
	
return array;
}

