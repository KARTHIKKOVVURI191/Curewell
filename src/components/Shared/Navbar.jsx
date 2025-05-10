import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/UserSlice';
import Swal from 'sweetalert2';

function Navbar() {
    const [isMobNav, setIsMobNav] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);

    const navLinkStyle = ({ isActive }) => {
        return {
            fontWeight: isActive ? '600' : '400',
        };
    };

    const handleClick = () => {
        navigate('/sign-in');
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Logout Successful!",
            icon: "success",
            confirmButtonText: "Ok",
        }).then(() => {
            dispatch(logout());
            localStorage.removeItem('user');
            navigate('/');
        });
    };

    const handleNav = () => {
        setIsMobNav(!isMobNav);
    };

    return (
        <div className='bg-gradient-to-r from-blue-500 to-blue-600 h-[80px] w-full fixed z-20'>
            <div className='flex max-w-7xl items-center justify-between m-auto h-full'>
                <div className='text-5xl text-white'>CureWell</div>
                <div className='justify-center items-center gap-6 text-xl hidden md:flex text-white'>
                    <NavLink style={navLinkStyle} to="/" className="hover:text-blue-200 transition-colors duration-300">Home</NavLink>
                    <NavLink style={navLinkStyle} to="/appointment" className="hover:text-blue-200 transition-colors duration-300">Appointment</NavLink>
                    {currentUser && currentUser.role === "doctor" && (
                        <NavLink style={navLinkStyle} to="/view-appointments" className="hover:text-blue-200 transition-colors duration-300">View Appointments</NavLink>
                    )}
                    <NavLink style={navLinkStyle} to="/about-us" className="hover:text-blue-200 transition-colors duration-300">About Us</NavLink>
                    <NavLink style={navLinkStyle} to="/contact-us" className="hover:text-blue-200 transition-colors duration-300">Contact Us</NavLink>
                    {!currentUser ? (
                        <button 
                            className='bg-white text-blue-600 p-1 pe-2 ps-2 rounded-full hover:scale-110 hover:bg-blue-50 duration-300 active:scale-90' 
                            onClick={handleClick}
                        >
                            LogIn
                        </button>
                    ) : (
                        <button 
                            className='bg-white text-blue-600 p-1 pe-2 ps-2 rounded-full hover:scale-110 hover:bg-blue-50 duration-300 active:scale-90' 
                            onClick={handleLogout}
                        >
                            LogOut
                        </button>
                    )}
                </div>
                <svg 
                    className={isMobNav ? 'size-10 md:hidden cursor-pointer z-50 text-white' : 'size-10 md:hidden cursor-pointer z-50 text-white'} 
                    onClick={handleNav} 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                >
                    <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default Navbar;