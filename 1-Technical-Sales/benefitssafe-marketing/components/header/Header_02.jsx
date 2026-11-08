'use client';
import { useState } from 'react';
import Link from 'next/link';
import LogoLight from '../logo/LogoLight';
import Navbar from '../navbar/Navbar';
const Header_02 = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header
      className='site-header site-header--absolute is--white py-3 border-b border-white/40 lg:border-b-0'
      id='sticky-menu'
    >
      <div className='global-container'>
        <div className='flex items-center justify-between gap-x-8'>
          {/* Header Logo */}
          <LogoLight />
          {/* Header Logo */}
          {/* Header Navigation */}
          <Navbar
            mobileMenu={mobileMenu}
            setMobileMenu={setMobileMenu}
            color={'is-text-white'}
          />
          {/* Header Navigation */}
          {/* Header User Event */}
          <div className='flex items-center gap-6'>
            <a
              href='https://app.benefitssafe.com/auth/login'
              className='hidden border-b-2 border-transparent font-bold text-white transition-all duration-300 hover:border-colorViolet hover:text-colorViolet lg:inline-block'
            >
              Login
            </a>
            <a
              href='https://app.benefitssafe.com/auth/register?plan=community'
              className='button hidden rounded-[50px] border-none bg-colorViolet text-white after:bg-colorViolet hover:border-colorViolet hover:text-white lg:inline-block'
            >
              Sign up free
            </a>
            {/* Responsive Off-canvas Menu Button */}
            <div className='block lg:hidden'>
              <button
                onClick={() => setMobileMenu(true)}
                className='mobile-menu-trigger is-white'
              >
                <span />
              </button>
            </div>
          </div>
          {/* Header User Event */}
        </div>
      </div>
    </header>
  );
};

export default Header_02;
