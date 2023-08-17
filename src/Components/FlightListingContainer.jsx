import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFlightApi } from '../Helpers/FlightApi'
import ListingBox from './ListingBox'
import { bookFlightApi } from '../Helpers/UserApi'
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


function FlightListingContainer() {
    const location = useLocation()
    const navigate=useNavigate()
    const [flightData,setFlightData]=useState([])
    const[isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
      getFlightApi(location.state.from,location.state.to,location.state.date,location.state.adults,location.state.infants,location.state.children,location.state.classType).then((res)=>{
        setFlightData(res.data)
       setIsLoading(true)
      })
    },[])
    const handleBookNow=(flightName,fromIataCode,toIataCode,fromCountry,toCountry,fromTime,toTime,duration,totalPrice)=>{
        const token=localStorage.getItem('jwt')
        if(token){
             const data={
                flightName:flightName,
                form:fromIataCode,
                to:toIataCode,
                fromTime:fromTime,
                toTime:toTime,
                duration:duration,
                totalPrice:totalPrice,
                date:location.state.date,
               adult: location.state.adults,
               infants:location.state.infants,
               children:location.state.children,
               classType:location.state.classType
             }
             bookFlightApi(data,token).then((res)=>{
                if(res.data.success){
                    Swal.fire({
                        title: "Success!",
                        text: "Your Booking Successfully Stored",
                        icon: "success",
                      }).then(() => {
                        navigate("/");
                      });
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
        }else{
           navigate('/login')
        }
    }
    function formatTime(dateTime) {
      const date = new Date(dateTime);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
  }
  
  function parseDuration(duration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);
  
    if (!matches) {
        return "";
    }
  
    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
  
    return `${hours}h${minutes}m`;
  }
  return (
    <div className="  bg-white w-[900px] border-2 rounded-2xl p-7 flex-col flex z-10 shadow-2xl overflow-y-auto max-h-[500px] ">
        <h3 className="text-lg font-normal text-center pb-5">
          Here Are The Available Flights On {location.state.date}
        </h3>
        {isLoading ? (

          
          <div>
        {flightData?.map((data) => {
    const flightName = data?.itineraries[0].segments[0].carrierCode;
    const fromIataCode = data?.itineraries[0].segments[0].departure?.iataCode;
    const toIataCode = data?.itineraries[0].segments[0].arrival?.iataCode;
    const fromTime = formatTime(data?.itineraries[0].segments[0].departure?.at);
    const toTime = formatTime(data?.itineraries[0].segments[0].arrival?.at);
    const duration = parseDuration(data?.itineraries[0].duration);
    const totalPrice = data?.price?.total;

    return (
        <ListingBox
        key={data?.id}
        flightName={flightName}
        fromIataCode={fromIataCode}
        toIataCode={toIataCode}
        fromTime={fromTime}
        toTime={toTime}
        duration={duration}
        totalPrice={totalPrice}
        handleBookNow={handleBookNow}
        />
        );
      })}     
        </div>
      ):(
        <div
        className="inline-block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px ml-20 !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      )
    }
    {isLoading && flightData.length===0 &&
        <p className='text-base font-semibold'>No Available Flights</p>
    }  
      </div>
  )
}

export default FlightListingContainer