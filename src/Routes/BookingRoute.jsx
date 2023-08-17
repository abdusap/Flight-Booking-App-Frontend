import React from 'react'
import { Route, Routes } from "react-router-dom";
import FormPage from '../Pages/FormPage';
import FlightListing from '../Pages/FlightListing';
import UserLayout from '../Layout/UserLayout';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage';
import ShowBooking from '../Pages/ShowBooking';

function BookingRoute() {
  return (
    <Routes>
    <Route path="/" element={<UserLayout />}>
    <Route path="/" element={<FormPage />}></Route>
    <Route path="login" element={<LoginPage/>}></Route>
    <Route path="signup" element={<SignUpPage/>}></Route>
    <Route path="listing" element={<FlightListing />}></Route>
    <Route path="booking" element={<ShowBooking />}></Route>
    </Route>
    </Routes>
  )
}

export default BookingRoute
