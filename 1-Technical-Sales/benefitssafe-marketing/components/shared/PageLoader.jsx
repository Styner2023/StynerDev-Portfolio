'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className='fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500'>
      <div className='relative flex items-center justify-center'>
        {/* Spinning dots ring */}
        <div className='absolute h-[90px] w-[90px] animate-spin' style={{ animationDuration: '1.4s' }}>
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className='absolute block h-[8px] w-[8px] rounded-full bg-colorViolet'
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateY(-38px) translate(-50%, -50%)`,
                opacity: 0.2 + (i * 0.1),
              }}
            />
          ))}
        </div>
        {/* Logo in center */}
        <div className='relative w-[48px] h-[48px]'>
          <Image
            src='/assets/img_placeholder/benefitssafe-logo/benefitssafe-logo-blue.webp'
            alt='BenefitsSafe'
            fill
            className='object-contain'
            priority
          />
        </div>
      </div>
      <span className='mt-6 font-bold text-white text-xl tracking-tight'>
        BenefitsSafe
      </span>
    </div>
  );
};

export default PageLoader;
