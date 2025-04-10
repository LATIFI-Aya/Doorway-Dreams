import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';

 const Header = () => {

    const [ menuOpened , setMenuOpened ] = useState(false);
    const [ dropdownMenu , setDropdownMenu ] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpened(!menuOpened)
    }

  return ( 

    <div className='max-padd-container flexBetween rounded-xl'>
        {/* logo */}
        <Link to={'/'} className="bold-24" >
          <div> Doorway <span className='text-secondary'>Dreams</span></div>
        </Link>
        {/* Searchbar */}
        <div className='bg-white ring-1 ring-gray-900/5 rounded-full px-4 py-2 sm:w-96 flexBetween gap-x-2 relative'>
            <input type="text" 
            placeholder='Search here...'
            className='outline-none border-none w-full bg-white'
            />
            <button className='absolute right-0 h-full w-10 rounded-full bg-secondary text-white flexCenter cursor-pointer ' > <FaSearch/></button>
        </div>
        {/* dropdown menu */}
        <div>
           <div>
               <div><FaUser /></div>
            </div> 
        </div>
    </div>
    
   
    
  )
}

export default Header