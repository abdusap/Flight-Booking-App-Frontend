import React, { useEffect, useState } from 'react'
import BookingDetailsBox from './BookingDetailsBox'
import { bookingHistoryApi } from '../Helpers/UserApi'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingPageContainer() {
    const [loading,setLoading]=useState(true)
    const [historyData,setHistoryData]=useState([])
    useEffect(()=>{
      let token=localStorage.getItem('jwt')
      if(token){
        bookingHistoryApi(token).then((res)=>{
          if(res.data.success){
           setHistoryData(res.data.history)
           setLoading(false)
          }else{
            toast.error("Something Went Wrong!.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })

      }
    },[])
  return (
        

<div className="bg-white md:w-2/4 md:px-10 px-5 mx-6  md:mx-auto my-10 rounded-md py-4 shadow-2xl overflow-y-auto max-h-[500px] ">
<div>
<ToastContainer />

  <p className="font-bold">Booking's</p>
  {loading ? (
    <div className="flex justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  ) : (<>
  {historyData?.map((data)=>
  <BookingDetailsBox key={data._id} flightName={data.flightName} from={data.from} to={data.to} fromTime={data.fromTime} toTime={data.toTime} duration={data.duration} totalPrice={data.totalPrice} date={data.date} classType={data.classType} />
  )
  }
  </>
  )}
  {historyData?.length===0 && !loading && <p>No Data Available</p>}
</div>
</div>
  )
}

export default BookingPageContainer