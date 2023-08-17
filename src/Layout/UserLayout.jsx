import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function UserLayout() {
  const navigate=useNavigate()
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    setToken(storedToken || '');
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken('');
    navigate('/');
  };
  return (
    <div className=''
    style={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        backgroundImage: "url(./images/bg-4.png)",
        backgroundSize: "cover",
        zIndex: "-1",
    }}
    ><div className=' absolute w-screen flex justify-between px-12 py-5'>
        <div>

<p className='text-white font-bold text-xl cursor-pointer'>Flight Booking</p>
        </div>
        <div>
          <Link to={'/'}>
         <span className='mr-6 text-white font-medium cursor-pointer'>Search Flight</span>
          </Link>
         {token!=='' &&
         <Link to={'/booking'}> <span className='mr-6 text-white font-medium cursor-pointer'>Booking</span></Link>}
         {token!=='' ?
            <span onClick={handleLogout} className='text-white font-medium cursor-pointer' >Logout</span>
        :
        <Link to={'/login'}> <span className='text-white font-medium cursor-pointer' >Login</span>
        </Link>
         }
        </div>
    </div>
    <div className="flex container-fluid h-screen  justify-center items-center px-5 md:px-0"
 
      >
        
         <Outlet />
      </div>
    </div>
  )
}

export default UserLayout