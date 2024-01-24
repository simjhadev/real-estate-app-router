"use client";

import {useState, useEffect, useRef} from 'react';
import { FcMenu, FcHome, FcAbout  } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import Link from 'next/link';
//import { cookies } from 'next/headers';
import { getCookie } from '../utils/cookieFunctionClientSide';
import { createCookie } from '../ServerActions/CookiesSA';

type NavbarProps = {
  location: string;
  lastSearchLoc : string;
}



export default function Navbar({location, lastSearchLoc}: NavbarProps){
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const searchLoc = lastSearchLoc ? lastSearchLoc : location;

    const sideList = [
        {
          icon: <FcHome className="text-2xl" />,
          title: "Home",
          key: "slHome",
          href:"/",
        },
        {
          icon: <BsSearch className="text-2xl" />,
          title: "Search",
          key: "slSearch",
          href:`/search?location=${searchLoc}`,
        },
        {
          icon: <FcAbout className="text-2xl" />,
          title: "Buy Property",
          key: "slBuy",
          href:`/search?location=${searchLoc}&status=for_sale`,
        },
        {
          icon: <FiKey className="text-2xl" />,
          title: "Rent Property",
          key: "slRent",
          href:`/search?location=${searchLoc}&status=for_rent`,
        },
      ];
    
      const navList = [
        {
          icon: <FcHome className="text-lg mr-1" />,
          title: "Home",
          key: "nlHome",
          href: "/",
        },
        {
          icon: <BsSearch className="text-lg mr-1" />,
          title: "Search",
          key: "nlSearch",
          href:`/search?location=${searchLoc}`,
        },
        {
            icon: <FcAbout className="text-lg mr-1" />,
            title: "Buy Property",
            key: "nlBuy",
            href:`/search?location=${searchLoc}&status=for_sale`,
        },
        {
            icon: <FiKey className="text-lg mr-1" />,
            title: "Rent Property",
            key: "nlRent",
            href:`/search?location=${searchLoc}&status=for_rent`,
        },
      ];

      const handleDrawer = () => {
        setIsOpen(!isOpen);
      };

      // On window resize set IsOpen state of Side Menu -------------------
      useEffect(() => {
        const handleResize = () => {
          
          if (window.innerWidth >= 768 ) {
            setIsOpen(false);
          }
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      // create current Location cookie ---------------------------
      useEffect(()=>{
          if(getCookie("currentLoc") === undefined || getCookie("currentLoc") === ""){
            const createCookieWithArgs = createCookie.bind(null, "currentLoc",location);
            createCookieWithArgs();
          }  
      },[])

      //Open Close menu ------------------------
      useEffect(() => {
        //logic for closing the open menu
        const checkIfClickedOutside = (e : Event) => {
          
          if (isOpen && e.target instanceof HTMLDivElement && !ref.current?.contains(e.target)) {
            
            setIsOpen(false);

          }
        };
    
        document.addEventListener("mousedown", checkIfClickedOutside);
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside);
        };
      }, [isOpen]);

      

    return(
      
        <nav  className="relative">
          <div className="flex justify-between p-2 border-b-1 border-gray-200 ">
            <div className="text-blue-400 font-bold text-3xl">
                <Link href='/'>Real Estate</Link>
            </div>

            <div className="hidden md:flex items-center">
                {navList.map(({icon, title, key, href})=>(
                    <Link href={href} key={key}>
                    <div 
                      className="flex items-center p-3 font-medium mr-2 text-center rounded hover:bg-sky-100 focus:outline-none focus:bg-gray-200"
                    >
                    <span>{icon}</span>
                    <span>{title}</span>   
                    </div>
                    </Link>
                ))}
            </div>

            <div className="md:hidden sm:block">
                <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
                    <FcMenu className="text-3xl" />
                </button>
            </div>
          </div>

          <div
            ref={ref}
            className={`absolute transform right-0 w-64 h-[100vh] bg-slate-100  transition-all duration-500 z-50 ${
              isOpen ? "opacity-1 -translate-x-0" : "opacity-0 translate-x-full"  
            }`}
          >
            {sideList.map(({ icon, title, key, href}) => {
              return (
                <Link href={href} key={key}>
                <span
                  
                  className="flex items-center p-4 hover:bg-sky-200 cursor-pointer"
                >
                  <span className="mr-2">{icon}</span> <span>{title}</span>
                </span>
                </Link>
              );
            })}
          </div>  
            
        </nav>
      )
}