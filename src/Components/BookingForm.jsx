import React, { useEffect, useState } from 'react'
import { getAirportApi } from '../Helpers/FlightApi';
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  const navigate=useNavigate()
    const [from,setFrom]=useState({name:'',iataId:''})
    const [to,setTo]=useState({name:'',iataId:''})
    const [fromDropdown, setFromDropdown] = useState(false);
    const [toDropdown, setToDropdown] = useState(false);
    const [fromOptions, setFromOptions] = useState([]);
    const [toOptions, setToOptions] = useState([]);
    const [date, setDate] = useState('');
    const [travelers,setTravelers]=useState({Adults:1,Children:0,Infants:0})
    const [classType,setClassType]=useState("ECONOMY")
    const [expandTravelers,setExpandTravelers]=useState(false)
    const [minDate, setMinDate] = useState(
        new Date().toISOString().split("T")[0]
      );
      useEffect(()  => {
        const debounceDelay = 1000; // milliseconds
        let debounceTimeout;
        if (from.name) {
            clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {

        getAirportApi(from.name).then((res)=>{
         setFromOptions(res?.data);
        })
    }, debounceDelay);
        } else {
          setFromOptions([]);
        }
      }, [from.name]);
      useEffect(()  => {
        const debounceDelay = 1000; // milliseconds
        let debounceTimeout;
        if (to.name) {
            clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        getAirportApi(to.name).then((res)=>{
         setToOptions(res?.data);
        })
    }, debounceDelay);
        } else {
          setToOptions([]);
        }
      }, [to.name]);

    
      const handleOptionSelect = (name,id) => {
        setFrom({name:name,iataId:id});
        setFromDropdown(false)
        setFromOptions([]);

      };
      const handleOptionTo = (name,id) => {
        setTo({name:name,iataId:id});
        setToDropdown(false)
        setToOptions([]);

      };

      const handleSubmit=(e)=>{
        if(from.name!==''&&to.name!==""&&date!==''){
          e.preventDefault()
          const data = {
            from: from.iataId,
            to: to.iataId,
            date: date,
            adults: travelers.Adults,
  children: travelers.Children,
  infants: travelers.Infants,
  classType: classType,
};
navigate("/listing", { state: data });

}
      }
  return (
        <div className="  bg-white w-[500px] border-2 rounded-2xl p-6 flex-col flex z-10 shadow-2xl relative">
        <h3 className="text-lg font-normal text-center ">
          FOR EVERYTHING
        </h3>
        <form action="">
        <div className="flex flex-col items-center">
<label className="self-start text-sm font-medium text-gray-900 ">From</label>

          <input
            type="text"
            placeholder="From"
            value={from.name}
            onChange={(e)=>{setFrom({...from,name:e.target.value});setFromDropdown(true)}} 
            required   
            className="border border-gray-300  w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"          />
        { fromDropdown &&  <div className='border absolute w-[440px] mt-[56px] z-1  overflow-y-auto max-h-[200px] bg-white'>

           {fromOptions?.map((option, index) => (
          <p key={index} className='cursor-pointer' onClick={() => handleOptionSelect(option.detailedName,option.iataCode)}>
            {option.detailedName}
          </p>
        ))}
           </div>}
         
<label className="self-start text-sm font-medium text-gray-900 ">To</label>
<input
            type="text"
            placeholder="To"
            value={to.name}
            onChange={(e)=>{setTo({...from,name:e.target.value});setToDropdown(true)}}
            required
            className="border border-gray-300   w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"          />
         {toDropdown && <div className='border absolute w-[440px] mt-[128px] z-1  overflow-y-auto max-h-[200px] bg-white'>
           
           {toOptions?.map((option, index) => (
          <p key={index} className='cursor-pointer' onClick={() => handleOptionTo(option.detailedName,option.iataCode)}>
            {option.detailedName}
          </p>
        ))}
           </div>}
  
<label className="self-start text-sm font-medium text-gray-900 ">Date</label>

           <input
           onChange={(e)=>setDate(e.target.value)}
           min={minDate}
            type="date"
            placeholder="Date"
            required
            className="border border-gray-300   w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
          />
          <label className="self-start text-sm font-medium text-gray-900 ">Travellers & Class</label>

          <div className='border border-gray-300   w-full text-base px-2   rounded  mb-4'>
            <div className='w-full cursor-pointer' onClick={()=>setExpandTravelers(!expandTravelers)}>
            {Object.keys(travelers).map((key,index,array) => (
  travelers[key]>=1 && (
    <span key={key} className='text-base font-medium ml-1'>
      {key}: {travelers[key]}
    </span>
  )
))}    
            <p className='text-xs block'>{classType}</p>
            </div>
            {expandTravelers && <>
            <div className='flex mb-2'>
                
                <div className='flex flex-col  w-1/3 items-center'>
                    <p className='text-base font-semibold'>Adults</p>
                    <p className='text-sm font-normal mb-1'>(Aged 12+ yrs)</p>
                    <div className='flex border-2 border-gray-300  rounded-lg h-10 '>
                        
                    <svg  onClick={()=>{if(travelers.Adults>1){setTravelers({...travelers,Adults:travelers.Adults-1})}}} className='my-4 mx-2 cursor-pointer'  width="15" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1h12.5" stroke="#2276E3"  ></path></svg>
                    <span className='my-auto mx-2'>{travelers.Adults}</span>
                        <svg onClick={()=>{if(travelers.Adults<9){setTravelers({...travelers,Adults:travelers.Adults+1})}}} className='my-auto mx-2 cursor-pointer ' width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1v12.5M1 7h12.5" stroke="#2276E3"  ></path></svg>
                    </div>
                </div>
                <div className='flex flex-col  w-1/3 items-center'>
                    <p className='text-base font-semibold'>Children</p>
                    <p className='text-sm font-normal mb-1'>(Aged 2-12 yrs)</p>
                    <div className='flex border-2 border-gray-300  rounded-lg h-10 '>
                        
                    <svg onClick={()=>{if(travelers.Children>=1){setTravelers({...travelers,Children:travelers.Children-1})}}} className='my-4  mx-2 cursor-pointer '  width="15" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1h12.5" stroke="#2276E3"  ></path></svg>
                    <span className='my-auto mx-2'>{travelers.Children}</span>
                        <svg  onClick={()=>{if(travelers.Children<9){setTravelers({...travelers,Children:travelers.Children+1})}}} className='my-auto mx-2 cursor-pointer' width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1v12.5M1 7h12.5" stroke="#2276E3"  ></path></svg>
                    </div>
                </div>
                <div className='flex flex-col  w-1/3 items-center'>
                    <p className='text-base font-semibold'>Infants</p>
                    <p className='text-sm font-normal mb-1'>(Below 2 yrs)</p>
                    <div className='flex border-2 border-gray-300  rounded-lg h-10 '>
                        
                    <svg onClick={()=>{if(travelers.Infants>=1){setTravelers({...travelers,Infants:travelers.Infants-1})}}} className='my-4  mx-2 cursor-pointer'  width="15" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1h12.5" stroke="#2276E3"  ></path></svg>
                    <span className='my-auto mx-2'>{travelers.Infants}</span>
                        <svg  onClick={()=>{if(travelers.Adults>travelers.Infants){setTravelers({...travelers,Infants:travelers.Infants+1})}}} className='my-auto mx-2 cursor-pointer' width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 1v12.5M1 7h12.5" stroke="#2276E3"  ></path></svg>
                    </div>
                </div>
            </div>
            <p className='text-center text-base font-bold'>Travell Class</p>
            <div className='flex w-full pb-2 mt-2'>
                <div className='w-1/4 '>
                    <div className={`${classType==="ECONOMY"?'bg-custom-grey':''} flex items-center border border-gray-300  w-fit h-14 mx-auto px-3 py-1 rounded-lg`}
                    onClick={()=>setClassType("ECONOMY")}>
                   <p className={`${classType==="ECONOMY"?`text-custom-blue`:''} text-center font-medium cursor-pointer `}>Economy</p> 

                    </div>
                </div>
                <div className='w-1/4 '>
                    <div className={`${classType==="PREMIUM_ECONOMY"?'bg-custom-grey':''} flex items-center border border-gray-300  w-fit h-14 mx-auto px-3 py-1 rounded-lg`}
                    onClick={()=>setClassType("PREMIUM_ECONOMY")}>
                   <p className={`${classType==="PREMIUM_ECONOMY"?'text-custom-blue':''} text-center font-medium cursor-pointer `}>Premium Economy</p> 
                    
                    </div>
                </div>
                <div className='w-1/4 '>
                    <div className={`${classType==="BUSINESS"?'bg-custom-grey':''} flex items-center border border-gray-300  w-fit h-14 mx-auto px-3 py-1 rounded-lg`}
                    onClick={()=>setClassType("BUSINESS")}>
                   <p className={`${classType==="BUSINESS"?'text-custom-blue':''} text-center font-medium cursor-pointer `}>Business</p> 

                    </div>
                </div>
                <div className='w-1/4 '>
                    <div className={`${classType==="FIRST"?'bg-custom-grey':''} flex items-center border border-gray-300  w-fit h-14 mx-auto px-3 py-1 rounded-lg`}
                    onClick={()=>setClassType("FIRST")}>
                   <p className={`${classType==="FIRST"?'text-custom-blue':''} text-center font-medium cursor-pointer`}>First Class</p> 

                    </div>
                </div>
            </div>
            </>}
          </div>
        </div>
        <div className="text-center">
          <button type='submit' onClick={handleSubmit}
            className="rounded-full bg-black text-white w-32 h-9  hover:bg-gray-800 mb-4"
          >
            Search Flights
          </button>
        </div>
        </form>
        <span className="text-center font-thin">
        
        </span>
      </div>
    // </div>
  )
}

export default BookingForm