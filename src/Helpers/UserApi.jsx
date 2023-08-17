import UserBaseApi from "../Config/UserBaseApi"


export const signupApi=async(data)=>{
    const resData =await UserBaseApi.post("/signup",data)
    return resData
 }
 
 export const loginApi=async(data)=>{
    const resData=await UserBaseApi.post("/login",data)
    return resData
 }


 export const bookFlightApi = async (data, token) => {
     const resData = await UserBaseApi.post("/book_flight", data, {
       headers: {
         Authorization: `Bearer ${token}` 
       }
     });
     return resData;
 };

 export const bookingHistoryApi = async ( token) => {
     const resData = await UserBaseApi.get("/booking_history", {
       headers: {
         Authorization: `Bearer ${token}` 
       }
     });
     return resData;
 };
 