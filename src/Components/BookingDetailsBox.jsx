import React from 'react'

function BookingDetailsBox({flightName,from,to,fromTime,toTime,duration,totalPrice,date,classType}) {
  return (
    <div className="flex w-full border-2 border-gray-500 rounded-lg p-3 md:flex-row flex-col mt-2">
    <div className="md:w-1/4">
      <p className="font-semibold">
        Booking ID: <span className="font-normal">23kjn3232</span>
      </p>
      <p className="font-semibold">
        Flight: <span className="font-normal">{flightName}</span>
      </p>
      <p className="font-semibold">
        Class: <span className="font-normal">{classType}</span>
      </p>
    </div>
    <div className="md:w-1/4">
      <p className="font-medium text-sm">From:</p>
 
      <p  className="font-semibold">{from}</p>
      <p  className="font-medium text-sm">{fromTime}</p>
    </div>
    <div className="md:w-1/4">
      <p className="font-medium text-sm">To:</p>
  
     <p  className="font-semibold">{to}</p>
      <p  className="font-medium text-sm">{toTime}</p>
    </div>
    <div className="md:w-1/4 md:block flex justify-around items-center">
      
      <div className="flex justify-end">
 
      </div>{" "}
      <p className="text-end font-semibold">
        Date:
        <span className="font-normal">
          {new Date(date).toLocaleDateString("en-GB")}
        </span>
      </p>
      <p className='font-semibold'>{duration}</p>
      <p className='text-end font-medium'>${totalPrice}</p>
    </div>
  </div>
  )
}

export default BookingDetailsBox