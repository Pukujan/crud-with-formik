import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { IoMenu } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

const Header = () => {

  const [isOpen, setIsOpen] = React.useState(false);



  const navs = [
    {
      name: 'Home',
      path: '/home'
    },
    {
      name: 'Contact',
      path: '/contact'
    }
  ]

  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();


  return (
    <div className='p-10 flex md:scale-100 scale-125  md:justify-between items-baseline gap-6 justify-center mx-10'>
      <div>
        <NavLink to='/' className='text-3xl font-bold text-red-600 duration-300 hover:duration-300 hover:text-black'>Logo</NavLink>
        {isOpen && (
          <div className='flex flex-col space-y-5 mt-5 md:hidden'>
            {navs.map(nav => (
              <NavLink
                to={nav.path}
                key={nav.name}
                className={`hover:scale-125  text-center hover:font-bold hover:text-red-600 ${location.pathname === nav.path ? 'font-bold' : ''}`}
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <div>
        <button
          onClick={toggle}
          className='hover:scale-110 md:hidden duration-300'
        >
          {isOpen ? (
            <RxCross2 size={30} className='hover:bg-slate-400 my-1' />
          ) : (
            <IoMenu size={30} />
          )}
        </button>
        {/* navbar menu for small screen with menu toggle*/}
      </div>

      <NavLink to='/detail/asdasdsa'>Detail</NavLink>

      <div className='md:flex hidden gap-10 justify-end'>
        {navs.map(nav => (
          <NavLink
            to={nav.path}
            key={nav.name}
            className={`hover:font-bold hover:text-red-600 duration-100 ${location.pathname === nav.path ? 'font-bold' : ''}`}
          >
            {nav.name}
          </NavLink>
        ))}
        {/* navbar using react router dom and map when size is above MD*/}
      </div>
    </div>
  );
};

export default Header;
