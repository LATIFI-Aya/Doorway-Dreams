import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/state';

 const Header = () => {

    const [ menuOpened , setMenuOpened ] = useState(false);
    const [ dropdownMenu , setDropdownMenu ] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div className='flexBetween gap-x-10'>
           <div onClick={() => setDropdownMenu(!dropdownMenu)} className='cursor-pointer relative'>
              <div>
                {!user ? ( 
                  <FaUser />
                  ):(
                    <img src={`http://localhost:4000/${user.profileImagePath.replace("public", "")}`} alt="" height={47} width={47} className='rounded-full object-cover aspect-square' />
                  )}
              </div>
              {dropdownMenu && !user &&(
                <div className='absolute top-16 right-0 bg-white w-40 p-4 rounded-3xl text-gray-30 medium-14 flex flex-col gap-y-2 z-50 shadow-md'>
                  <Link to={"/login"} >Login</Link>
                  <Link to={"/register"} >Sign Up</Link>
                </div>
              )}
              {dropdownMenu && user &&(
                <div className='absolute top-16 right-0 bg-white w-40 p-4 rounded-3xl text-gray-30 medium-14 flex flex-col gap-y-2 z-50 shadow-md'>
                  <Link to={"/create-listing"} >Add a Property</Link>
                  <Link to={`${user.id}/trips`} >Trip List</Link>
                  <Link to={`${user.id}/wishlist`} >Wish List</Link>
                  <Link to={`${user.id}/listing`} >Property List</Link>
                  <Link to={`${user.id}/reservation`} >Reservation List</Link>
                  <Link to={"/login"} onClick={() => {dispatch(setLogout()); }} >Log out</Link>
                </div>
              )}
            </div> 
        </div>
    </div>
  );
}

export default Header