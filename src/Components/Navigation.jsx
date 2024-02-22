import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className='absolute w-screen top-0 z-[10] left-0 px-10 py-10 flex justify-between'>
      <div onClick={() => handleNavigate("/")} className='cursor-pointer'>
        <img src='/icons/logo.png' alt='' className='w-14 object-contain' />
      </div>
      <div className='h-20 cursor-pointer  '>
        <span
          onClick={() => handleNavigate("/about")}
          className='text-black text-xl uppercase cursor-pointer hover:text-black hover:tracking-wide transition-all duration-300 ease-in-out'
        >
          About Us
        </span>
      </div>
    </div>
  );
}
