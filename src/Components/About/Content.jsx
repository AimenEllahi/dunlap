import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
export default function Content() {
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fadeIn");
          observer.unobserve(entry.target);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const ourText = new SplitType(".about-header-title", { types: "chars" });
    const chars = ourText.chars;
    const tl = gsap.timeline();
    tl.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,

        opacity: 1,
        stagger: 0.05,
        duration: 2,
        ease: "power4.out",
      }
    ).to(chars, {
      opacity: 0,
      onStart: () => {
        const tl2 = gsap.timeline();
        tl2
          .to(".about-header-desc-1", {
            opacity: 1,
          })
          .to(".about-header-desc-2", {
            opacity: 1,
          });
      },
    });
  }, []);
  return (
    <div className='z-[10] mt-20 text-black arvo-regular'>
      <div className='h-[93vh] relative w-screen  flex flex-col items-center px-5 md:px-[10rem] py-40 gap-y-16 text-center md:text-left'>
        <h1 className=' text-4xl md:text-8xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-120%] font-bold about-header-title'>
          About Us
        </h1>
        <span className='text-xl md:text-[2rem] opacity-0 font-semibold mt-5 self-start w-full md:w-[60%] about-header-desc-1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Nullam
        </span>
        <span className='md:text-xl mt-5 opacity-0 self-end w-full md:w-[60%] about-header-desc-2'>
          Nulla facilisi. Nullam nec purus ac libero gravida blandit. Nulla
          facilisi. Nullam nec purus ac libero gravida blandit. Nulla facilisi.
          Nullam nec purus ac libero gravida blandit. Nulla facilisi. Nullam nec
          purus ac libero gravida blandit. Nulla facilisi. Nullam nec purus ac
          libero gravida blandit. Nulla facilisi.
        </span>
      </div>
      <div className='flex items-center justify-end gap-x-8 md:gap-x-20'>
        <div className='flex flex-col self-start -mt-16 text-xl md:text-2xl font-semibold items-center gap-y-1'>
          <span>C</span>
          <span>O</span>
          <span>M</span>
          <span>P</span>
          <span>A</span>
          <span>N</span>
          <span>Y</span>
          <span>N</span>
          <span>A</span>
          <span>M</span>
          <span>E</span>
        </div>
        <img
          src='/images/about.webp'
          ref={imageRef}
          className='w-3/4 md:object-contain md:h-auto h-[60vh] object-cover   image  '
        />
      </div>
      <div className='flex flex-col px-5 md:px-64 h-[90vh] gap-y-20'>
        <p className='uppercase w-24 text-4xl md:text-6xl -mt-8'>
          Company profile
        </p>
        <div className='text-sm md:text-xl ms-10 md:ms-60 space-y-5 w-full md:w-3/5'>
          <div className='grid grid-cols-2'>
            <span className='col-span-1'>Name</span>
            <span className='col-span-1'>Soothing App</span>
          </div>
          <div className='grid grid-cols-2'>
            <span className='col-span-1'>Sector</span>
            <span className='col-span-1'>Energy</span>
          </div>
          <div className='grid grid-cols-2'>
            <span className='col-span-1'>Employees</span>
            <span className='col-span-1'>8-10</span>
          </div>
          <div className='grid grid-cols-2'>
            <span className='col-span-1'>Revenue</span>
            <span className='col-span-1'>1 Billion Dollars</span>
          </div>
          <div className='grid grid-cols-2'>
            <span className='col-span-1'>Established Since</span>
            <span className='col-span-1'>1 Jan 2014</span>
          </div>
        </div>
      </div>
    </div>
  );
}
