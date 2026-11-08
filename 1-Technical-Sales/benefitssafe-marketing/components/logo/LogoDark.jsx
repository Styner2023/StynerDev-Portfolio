import Image from 'next/image';
import Link from 'next/link';

const LogoDark = () => {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <span className='relative block w-[32px] h-[32px] sm:w-[36px] sm:h-[36px]'>
        <Image
          src='/assets/img_placeholder/benefitssafe-logo/benefitssafe-logo-blue.webp'
          alt='BenefitsSafe'
          fill
          className='object-contain'
          priority
        />
      </span>
      <span className='font-bold text-colorCodGray text-lg sm:text-xl tracking-tight'>
        BenefitsSafe
      </span>
    </Link>
  );
};

export default LogoDark;
