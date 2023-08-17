import React from 'react'

function ListingBox({flightName,fromIataCode,toIataCode,fromCountry,toCountry,fromTime,toTime,duration,totalPrice,handleBookNow}) {
  return (
    <div className='w-[800px] border border-gray-400 mx-auto px-5 pt-2 pb-4 rounded-lg mb-3'>
    <div  className='w-full'>
        <p className='font-medium text-base'>{flightName}</p>
    </div>
    <div className='w-full flex  mt-2 mb-2'>
    <div className='w-3/12'>
        
        <p className='text-sm'><span className='text-sm font-medium'>{fromIataCode}</span>{fromCountry}</p>
        <p className='font-bold text-base'>{fromTime}</p>
    </div>
    <div className='w-3/12'>
        
        <p className='font-bold text-base'>{duration}</p>
    </div>
    <div className='w-3/12'>
        
    <p className='text-sm'><span className='text-sm font-medium'>{toIataCode}</span>{toCountry}</p>
        <p className='font-bold text-base'>{toTime}</p>
    </div>
    <div className='w-3/12 flex justify-between'>
        
      <p className='font-bold text-base text-end'>${totalPrice}</p>
        <button onClick={()=>handleBookNow(flightName,fromIataCode,toIataCode,fromCountry,toCountry,fromTime,toTime,duration,totalPrice)} className='rounded-full bg-black text-white w-28 h-8  hover:bg-gray-800 '>Book Now</button>
    </div>
    </div>
</div>
  )
}

export default ListingBox