'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// eslint-disable-next-line react/prop-types
const Navbar = ({ mobileMenu, setMobileMenu, color }) => {
  const [mobileSubMenu, setMobileSubMenu] = useState('');
  const [menuTitle, setMenuTitle] = useState('');

  const handleMenu = () => {
    setMobileMenu(false);
    setMobileSubMenu('');
  };

  const handleSubMenu = (e, id) => {
    e.preventDefault();
    setMobileSubMenu(id);

    if (e.target.tagName === 'A') {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleGoBack = () => {
    if (mobileSubMenu) {
      setMobileSubMenu('');
      return;
    }
  };

  return (
    <div className='menu-block-wrapper'>
      <div
        onClick={handleMenu}
        className={`menu-overlay ${mobileMenu && 'active'}`}
      />
      <nav
        className={`menu-block ${mobileMenu && 'active'}`}
        id='append-menu-header'
      >
        <div className={`mobile-menu-head ${mobileSubMenu && 'active'}`}>
          <div onClick={handleGoBack} className='go-back'>
            <Image
              className='dropdown-icon'
              src='/assets/img_placeholder/icon-black-long-arrow-right.svg'
              alt='cheveron-right'
              width={16}
              height={16}
            />
          </div>
          <div className='current-menu-title'>{menuTitle}</div>
          <div onClick={handleMenu} className='mobile-menu-close'>
            ×
          </div>
        </div>
        <ul className={`site-menu-main ${color}`}>
          {/* Global navbar */}
          <li className='nav-item'>
            <Link href='/' className='nav-link-item'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/services' className='nav-link-item'>
              Features
            </Link>
          </li>
          <li className='nav-item'>
            <Link href='/pricing' className='nav-link-item'>
              Pricing
            </Link>
          </li>
          <li
            onClick={(e) => handleSubMenu(e, 1)}
            className='nav-item nav-item-has-children'
          >
            <Link href='#' className='nav-link-item drop-trigger'>
              Company
              <Image
                className='dropdown-icon'
                src='/assets/img_placeholder/icon-black-cheveron-right.svg'
                alt='cheveron-right'
                width={16}
                height={16}
              />
            </Link>
            <ul
              className={`sub-menu ${mobileSubMenu === 1 && 'active'}`}
              id='submenu-1'
            >
              <li className='sub-menu--item'>
                <Link href='/about'>About</Link>
              </li>
              <li className='sub-menu--item'>
                <Link href='/faq'>FAQ</Link>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <Link href='/contact' className='nav-link-item'>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
