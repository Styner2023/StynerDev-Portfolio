import Image from 'next/image';
import Link from 'next/link';

const Footer_02 = () => {
  return (
    <footer id='footer-2' className='relative'>
      <div className='absolute -top-[77px] left-1/2 z-10 h-[77px] w-full -translate-x-1/2 bg-[url(/assets/img_placeholder/th-2/arc-bottom-shape-1.svg)] bg-cover bg-center bg-no-repeat'></div>
      <div className='relative z-[1] overflow-hidden bg-black text-white'>
        {/* Section Container */}
        <div className='pb-10 pt-1 lg:pt-7 xl:pt-[68px]'>
          {/* Footer Top */}
          <div>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='mx-auto mb-10 text-center md:mb-16 md:max-w-lg lg:mb-20 lg:max-w-xl xl:max-w-3xl'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Ready to protect benefits and disburse safely?
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Footer Subscriber Form */}
              <form action='#' method='post'>
                <div className='relative mx-auto h-[60px] max-w-[500px]'>
                  <input
                    type='email'
                    name='newsletter-email'
                    id='newsletter-email'
                    placeholder='Enter your work email'
                    className='p-y-[18px] h-full w-full rounded-[50px] border-[1px] border-white bg-transparent px-[24px] pr-20 outline-none sm:pr-48'
                    required=''
                  />
                  <button
                    type='submit'
                    className='absolute right-[5px] top-[50%] inline-flex h-[50px] -translate-y-[50%] items-center gap-x-[10px] rounded-[50px] bg-colorViolet px-6 transition-all duration-300 hover:bg-colorViolet'
                  >
                    <span className='hidden sm:inline-block'>Start Free Trial</span>
                    <Image
                      src='/assets/img_placeholder/th-1/arrow-right-large.svg'
                      alt='newsletter'
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </form>
              {/* Footer Subscriber Form */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Top */}
          {/* Footer Center */}
          <div className='mt-16 xl:mt-20 xxl:mt-[100px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Footer Widgets Block */}
              <div className='grid gap-x-10 gap-y-[60px] sm:grid-cols-2 md:grid-cols-4 lg:flex lg:justify-between lg:gap-x-20'>
                {/* Footer Widget */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Product
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px] capitalize'>
                    <li>
                      <Link
                        href='/'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/about'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/services'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/pricing'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/contact'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget */}
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Get Started
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px] capitalize'>
                    <li>
                      <a
                        href='https://app.benefitssafe.com/auth/register?plan=community'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Signup
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://app.benefitssafe.com/auth/login'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Login
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Company
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px] capitalize'>
                    <li>
                      <Link
                        href='/about'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/faq'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
                {/* Footer Widget Item — Legal */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Legal
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[10px]'>
                    <li>
                      <Link
                        href='/privacy'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/terms'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/dpa'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Data Processing Agreement
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/subprocessors'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Subprocessors
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/security'
                        className='transition-all duration-300 ease-linear hover:text-colorViolet'
                      >
                        Security
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item — Legal */}
                {/* Footer Widget Item */}
                <div className='flex flex-col gap-y-6'>
                  {/* Footer Title */}
                  <h4 className='text-[21px] font-semibold capitalize text-white'>
                    Socials
                  </h4>
                  {/* Footer Title */}
                  {/* Footer Navbar */}
                  <ul className='flex flex-col gap-y-[15px] capitalize'>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.facebook.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/facebook-icon-white.svg'
                            alt='facebook-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Facebook</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.twitter.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/twitter-icon-white.svg'
                            alt='twitter-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Twitter</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.instagram.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/instagram-icon-white.svg'
                            alt='instagram-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Instagram</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel='noopener noreferrer'
                        href='http://www.linkedin.com'
                        className='group flex items-center gap-x-3'
                      >
                        <div className='flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-white bg-opacity-10 transition-all duration-300 group-hover:bg-colorViolet'>
                          <Image
                            src='/assets/img_placeholder/th-1/linkedin-icon-white.svg'
                            alt='linkedin-icon-white'
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className='inline-block flex-1'>Linkedin</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Footer Widget Item */}
              </div>
              {/* Footer Widgets Block */}
            </div>
            {/* Section Container */}
          </div>
          {/* Footer Center */}
          {/* Footer Separator */}
          <div className='global-container'>
            <div className='mb-10 mt-[60px] h-[1px] w-full bg-white' />
          </div>
          {/* Footer Separator */}
          {/* Footer Bottom */}
          <div>
            <div className='global-container'>
              <div className='flex flex-col items-center gap-y-6 text-center md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-y-4 md:text-left'>
                <Link href='/' className='flex items-center gap-2'>
                  <span className='relative block w-[28px] h-[28px]'>
                    <Image
                      src='/assets/img_placeholder/benefitssafe-logo/benefitssafe-logo-blue.webp'
                      alt='BenefitsSafe'
                      fill
                      className='object-contain'
                    />
                  </span>
                  <span className='font-bold text-white text-lg tracking-tight'>BenefitsSafe</span>
                </Link>
                <address className='not-italic text-sm leading-relaxed text-white/80'>
                  Oakland, California
                  <br />
                  <a
                    href='mailto:hello@benefitssafe.com'
                    className='transition-all duration-300 hover:text-colorViolet'
                  >
                    hello@benefitssafe.com
                  </a>
                </address>
                <p className='text-sm'>
                  &copy; 2026 BenefitsSafe. All rights reserved. Built by{' '}
                  <Link
                    href='https://www.styner.dev/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-all duration-300 hover:text-colorViolet'
                  >
                    StynerDev
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* Footer Bottom */}
        </div>
        {/* Section Container */}
        {/* Background Gradient */}
        <div className='absolute left-1/2 top-[80%] -z-[1] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#1D4ED8] to-[#2563EB] blur-[250px]'></div>
      </div>
    </footer>
  );
};

export default Footer_02;
