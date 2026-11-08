'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import useAccordion from '@/components/hooks/useAccordion';
import useTabs from '@/components/hooks/useTabs';
import Header_02 from '@/components/header/Header_02';
import Footer_02 from '@/components/footer/Footer_02';


function Home() {
  const [activeIndex, handleAccordion] = useAccordion(0);
  const [askIndex, handleAsk] = useAccordion(0);
  const [activeTab, handleTab] = useTabs();
  const swiperRef = useRef(null);

  return (
    <div className='page-wrapper relative z-[1] bg-white'>
      <Header_02 />
      <main className='main-wrapper relative overflow-hidden'>
        {/*...::: Hero Section Start :::... */}
        <section id='hero-section'>
          <div className='relative overflow-hidden bg-black text-white'>
            {/* Section Spacer */}
            <div className='pb-28 pt-28 md:pb-40 lg:pt-28 xl:pb-[90px] xl:pt-[122px]'>
              {/* Section Container */}
              <div className='global-container'>
                <div className='grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,_1fr)_0.7fr]'>
                  {/* Hero Content */}
                  <div>
                    <h1 className='jos mb-6 max-w-md break-words font-clashDisplay text-5xl font-medium leading-none text-white md:max-w-full md:text-6xl lg:text-7xl xl:text-8xl xxl:text-[100px]'>
                      Protect Benefits. Disburse Grants. Monitor Compliance.
                    </h1>
                    <p className='jos mb-11'>
                      BenefitsSafe helps nonprofits manage restricted grant
                      funds and issue virtual debit cards &mdash; without
                      beneficiaries losing their SSI, Medi-Cal, or CalFresh
                      benefits.
                    </p>
                    <a
                      rel='noopener noreferrer'
                      href='https://app.benefitssafe.com/auth/register?plan=community'
                      className='jos button relative z-[1] inline-flex items-center gap-3 rounded-[50px] border-none bg-colorViolet py-[18px] text-white after:bg-colorViolet hover:text-white'
                    >
                      Start Free Trial
                      <Image
                        src='/assets/img_placeholder/th-2/icon-white-long-arrow-right.svg'
                        alt='arrow-right'
                        width={24}
                        height={24}
                      />
                    </a>
                  </div>
                  {/* Hero Content */}
                  {/* Hero Image */}
                  <div className='hero-img animate-pulse overflow-hidden rounded-2xl bg-black text-right'>
                    <Image
                      src='/assets/img_placeholder/homepage-assets/1a.webp'
                      alt='BenefitsSafe grant disbursement dashboard'
                      width={511}
                      height={695}
                      className='h-auto w-full'
                    />
                  </div>
                  {/* Hero Image */}
                </div>
              </div>
              {/* Section Container */}
            </div>
            {/* Section Spacer */}
            {/* Background Gradient */}
            <div className='absolute left-1/2 top-[80%] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#1D4ED8] to-[#2563EB] blur-[250px]'></div>
            <div className='absolute bottom-0 left-1/2 h-[77px] w-full -translate-x-1/2 bg-[url(/assets/img_placeholder/th-2/arc-top-shape-1.svg)] bg-cover bg-center bg-no-repeat'></div>
          </div>
        </section>
        {/*...::: Hero Section End :::... */}
        {/*...::: Brand Strip Start :::... */}
        <section id='brand-strip-section'>
          <div className='py-14 xl:py-20'>
            <div className='global-container'>
              <div className='jos mx-auto mb-10 max-w-[715px] text-center lg:mb-12'>
                <p className='text-lg'>
                  Real-time monitoring, alerts, and compliance tracking — every minute of every day
                </p>
              </div>
              <div className='jos brand-slider' data-jos_animation='fade'>
                <Swiper
                  slidesPerView={2}
                  spaceBetween={105}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  breakpoints={{
                    768: { slidesPerView: 3 },
                    992: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 },
                  }}
                >
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_1. Clock Time, Alarm, Stopwatch, Countdown, Timer.png'
                      alt='Real-time monitoring'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_2. Calendar Date, Event, Schedule, Reminder, Planner.png'
                      alt='Grant scheduling'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_7. Alarm Bell, Clock, Bell, Alert, Time.png'
                      alt='Threshold alerts'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_11. Task Agenda, To-do, Checklist, Assignment, Agenda.png'
                      alt='Compliance checklist'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_6. Planner Schedule, Agenda, Calendar, Task, Reminder.png'
                      alt='Grant reporting'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_10. Reminder Alert, Notification, Alarm, Schedule, Reminder .png'
                      alt='Benefit alerts'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_12. Event Calendar, Ticket, Calendar, Invitation, Stage.png'
                      alt='Event tracking'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src='/assets/img_placeholder/03-two-tone/00_4. Schedule Calendar, Date, Event, Schedule, Reminder.png'
                      alt='Disbursement scheduling'
                      width={80}
                      height={80}
                      className='max-w-[80px]'
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section>
        {/*...::: Brand Strip End :::... */}
        {/*...::: Feature Section Start :::... */}
        <section id='feature-section'>
          {/* Section Spacer */}
          <div className='pb-20 pt-1 xl:pb-[130px] xl:pt-[53px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mb-10 text-left sm:mx-auto sm:text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Built to protect beneficiaries and your mission
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Feature List */}
              <ul className='grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3'>
                {/* Feature Item */}
                <li
                  className='jos flex flex-col gap-x-[30px] gap-y-6 sm:flex-row'
                  data-jos_delay='0.1'
                >
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)]'>
                    <Image
                      src='/assets/img_placeholder/th-2/icon-feature-1.svg'
                      alt='icon-feature-1'
                      width={49}
                      height={45}
                    />
                  </div>
                  <div className='flex flex-1 flex-col gap-y-5'>
                    <div className='font-clashDisplay text-[22px] font-medium leading-6 lg:text-[28px] lg:leading-5'>
                      Threshold Monitoring
                    </div>
                    <p>
                      Daily tracking of SSI, SSDI, Medi-Cal, and CalFresh
                      limits for every beneficiary
                    </p>
                  </div>
                </li>
                {/* Feature Item */}
                {/* Feature Item */}
                <li
                  className='jos flex flex-col gap-x-[30px] gap-y-6 sm:flex-row'
                  data-jos_delay='0.2'
                >
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)]'>
                    <Image
                      src='/assets/img_placeholder/th-2/icon-feature-2.svg'
                      alt='icon-feature-2'
                      width={45}
                      height={45}
                    />
                  </div>
                  <div className='flex flex-1 flex-col gap-y-5'>
                    <div className='font-clashDisplay text-[22px] font-medium leading-6 lg:text-[28px] lg:leading-5'>
                      Risk Classification
                    </div>
                    <p>
                      Every expense auto-classified LIKELY_SAFE,
                      NEEDS_REVIEW, or BLOCKED before approval
                    </p>
                  </div>
                </li>
                {/* Feature Item */}
                {/* Feature Item */}
                <li
                  className='jos flex flex-col gap-x-[30px] gap-y-6 sm:flex-row'
                  data-jos_delay='0.3'
                >
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white p-4 shadow-[0_4px_60px_0_rgba(0,0,0,0.1)]'>
                    <Image
                      src='/assets/img_placeholder/th-2/icon-feature-3.svg'
                      alt='icon-feature-3'
                      width={36}
                      height={45}
                    />
                  </div>
                  <div className='flex flex-1 flex-col gap-y-5'>
                    <div className='font-clashDisplay text-[22px] font-medium leading-6 lg:text-[28px] lg:leading-5'>
                      Institutional Memory
                    </div>
                    <p>
                      Staff turnover never erases compliance knowledge &mdash;
                      your system remembers everything
                    </p>
                  </div>
                </li>
                {/* Feature Item */}
              </ul>
              {/* Feature List */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Feature Section End :::... */}
        {/* Separator */}
        <div className='global-container'>
          <div className='h-[1px] w-full bg-[#EAEDF0]' />
        </div>
        {/* Separator */}
        {/*...::: Service Section Start :::... */}
        <section id='section-service'>
          {/* Section Spacer */}
          <div className='pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mb-10 lg:mb-16 xl:mb-20'>
                <div className='md:max-w-sm lg:max-w-xl xl:max-w-[746px]'>
                  <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                    Core features that protect every dollar
                  </h2>
                </div>
              </div>
              {/* Section Content Block */}
              {/* Service List */}
              <ul className='jos grid grid-cols-1 gap-[2px] overflow-hidden rounded-[10px] border-2 border-colorCodGray bg-colorCodGray sm:grid-cols-2 lg:grid-cols-4'>
                {/* Service Item */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-colorCodGray'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-1.svg'
                      alt='service-icon-1'
                      width={70}
                      height={70}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/service-icon-orange-1.svg'
                      alt='service-icon-1-hover'
                      width={70}
                      height={70}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block font-clashDisplay text-xl font-medium leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <Link href='#' className='hover:text-colorViolet'>
                      Virtual Card Issuance
                    </Link>
                  </h3>
                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Issue Visa debit cards with built-in spending controls.
                    Block merchants by category, set spending limits, and
                    enforce curfews &mdash; all through one dashboard.
                  </p>
                  <Link
                    href='#'
                    className='relative inline-block h-[30px] w-[30px] duration-300'
                  >
                    <Image
                      src='/assets/img_placeholder/th-1/arrow-right-black.svg'
                      alt='arrow-right'
                      width={30}
                      height={30}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/arrow-right-orange.svg'
                      alt='arrow-right-hover'
                      width={30}
                      height={30}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </Link>
                </li>
                {/* Service Item */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-colorCodGray'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-2.svg'
                      alt='service-icon-2'
                      width={70}
                      height={70}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/service-icon-orange-2.svg'
                      alt='service-icon-2-hover'
                      width={70}
                      height={70}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block font-clashDisplay text-xl font-medium leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <Link href='#' className='hover:text-colorViolet'>
                      Grant Compliance Engine
                    </Link>
                  </h3>
                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Every expense is automatically classified: LIKELY_SAFE,
                    NEEDS_REVIEW, or BLOCKED. Your compliance team sees risk
                    badges before approving a single dollar.
                  </p>
                  <Link
                    href='#'
                    className='relative inline-block h-[30px] w-[30px] duration-300'
                  >
                    <Image
                      src='/assets/img_placeholder/th-1/arrow-right-black.svg'
                      alt='arrow-right'
                      width={30}
                      height={30}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/arrow-right-orange.svg'
                      alt='arrow-right-hover'
                      width={30}
                      height={30}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </Link>
                </li>
                {/* Service Item */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-colorCodGray'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-3.svg'
                      alt='service-icon-3'
                      width={70}
                      height={70}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/service-icon-orange-3.svg'
                      alt='service-icon-3-hover'
                      width={70}
                      height={70}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block font-clashDisplay text-xl font-medium leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <Link href='#' className='hover:text-colorViolet'>
                      SentinelLayer AI Monitoring
                    </Link>
                  </h3>
                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Five autonomous agents monitor your beneficiaries 24/7.
                    Threshold warnings, transaction compliance, and funder
                    reports &mdash; generated while your staff sleeps.
                  </p>
                  <Link
                    href='#'
                    className='relative inline-block h-[30px] w-[30px] duration-300'
                  >
                    <Image
                      src='/assets/img_placeholder/th-1/arrow-right-black.svg'
                      alt='arrow-right'
                      width={30}
                      height={30}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/arrow-right-orange.svg'
                      alt='arrow-right-hover'
                      width={30}
                      height={30}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </Link>
                </li>
                {/* Service Item */}
                <li className='group bg-white p-[30px] transition-all duration-300 ease-in-out hover:bg-colorCodGray'>
                  <div className='relative mb-9 h-[70px] w-[70px]'>
                    <Image
                      src='/assets/img_placeholder/th-1/service-icon-black-4.svg'
                      alt='service-icon-4'
                      width={70}
                      height={70}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/service-icon-orange-4.svg'
                      alt='service-icon-4-hover'
                      width={70}
                      height={70}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </div>
                  <h3 className='mb-4 block font-clashDisplay text-xl font-medium leading-tight -tracking-[0.5px] group-hover:text-white xl:text-2xl xxl:text-[28px]'>
                    <Link href='#' className='hover:text-colorViolet'>
                      Workflow Automation
                    </Link>
                  </h3>
                  <p className='mb-12 duration-300 group-hover:text-white'>
                    Connect Gmail, Slack, Google Calendar, and Sheets. When
                    an expense is approved or a threshold is triggered, your
                    team is notified automatically.
                  </p>
                  <Link
                    href='#'
                    className='relative inline-block h-[30px] w-[30px] duration-300'
                  >
                    <Image
                      src='/assets/img_placeholder/th-1/arrow-right-black.svg'
                      alt='arrow-right'
                      width={30}
                      height={30}
                    />
                    <Image
                      src='/assets/img_placeholder/th-1-violet/arrow-right-orange.svg'
                      alt='arrow-right-hover'
                      width={30}
                      height={30}
                      className='absolute left-0 top-0 h-full w-full opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100'
                    />
                  </Link>
                </li>
              </ul>
              {/* Service List */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Service Section End :::... */}
        {/*...::: Product Showcase Section Start :::... */}
        <section id='product-showcase-section'>
          <div className='mx-auto max-w-[1500px] px-5 py-14 md:py-20 xl:py-[130px]'>
            <div className='relative z-[1] overflow-hidden rounded-[20px] bg-colorCodGray px-5 pb-14 pt-14 text-white sm:px-8 sm:pb-16 sm:pt-16 md:rounded-[30px] md:px-10 md:pb-20 md:pt-20 lg:rounded-[40px] lg:px-16 lg:pb-24 lg:pt-24 xl:rounded-[50px] xl:px-20 xl:pb-[100px] xl:pt-[100px]'>
              <div className='mb-10 flex flex-col items-center text-center md:mb-14 lg:mb-20'>
                <h2 className='jos mb-5 max-w-[510px] font-clashDisplay text-3xl font-medium leading-[1.06] text-white sm:mb-6 sm:text-4xl md:text-[44px] lg:max-w-[768px] lg:text-[56px] xl:max-w-[1076px] xl:text-[68px]'>
                  One Platform. Every Nonprofit Need.
                </h2>
                <p className='jos mb-8 max-w-[700px] text-base font-semibold sm:mb-11 sm:text-lg md:text-xl xl:max-w-[980px]'>
                  From grant tracking to card issuance, from compliance
                  monitoring to funder reporting &mdash; BenefitsSafe replaces
                  the spreadsheets, paper checks, and manual processes that
                  slow your mission down.
                </p>
                <div
                  className='jos flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-6'
                  data-jos_animation='fade'
                >
                  <a
                    href='https://app.benefitssafe.com/auth/register?plan=community'
                    className='button rounded-[50px] border-2 border-colorViolet bg-colorViolet py-4 text-center text-white after:bg-colorViolet hover:border-colorViolet hover:text-white'
                  >
                    Start Free Trial
                  </a>
                  <Link
                    href='/services'
                    className='button rounded-[50px] border-2 border-white bg-transparent py-4 text-center text-white after:bg-colorViolet hover:border-colorViolet hover:text-white'
                  >
                    See How It Works
                  </Link>
                </div>
              </div>
              {/* Flexible media container — swap for <video>, <iframe>, or walkthrough embed */}
              <div
                className='jos hero-img overflow-hidden rounded-[10px] bg-black shadow-[0_20px_80px_rgba(0,0,0,0.4)] md:rounded-2xl'
                data-jos_animation='zoom'
              >
                <Image
                  src='/assets/img_placeholder/homepage-assets/27.webp'
                  alt='BenefitsSafe grant disbursement analytics'
                  width={1296}
                  height={640}
                  className='h-auto w-full'
                />
              </div>
              {/* Background Gradient */}
              <div className='absolute left-1/2 top-0 -z-[1] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#1D4ED8] to-transparent opacity-40 blur-[150px] md:h-[600px] md:w-[600px] md:blur-[200px] lg:h-[800px] lg:w-[800px] lg:blur-[250px]'></div>
            </div>
          </div>
        </section>
        {/*...::: Product Showcase Section End :::... */}
        {/* Separator */}
        <div className='global-container'>
          <div className='h-[1px] w-full bg-[#EAEDF0]' />
        </div>
        {/* Separator */}
        {/*...::: Content Section Start (Wider Audience) :::... */}
        <section id='content-section-audience'>
          {/* Section Spacer */}
          <div className='pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:gap-28 xxl:gap-32'>
                {/* Content Left Block */}
                <div
                  className='jos order-2 overflow-hidden rounded-md md:order-1'
                  data-jos_animation='fade-left'
                >
                  <Image
                    src='/assets/img_placeholder/homepage-assets/20.webp'
                    alt='BenefitsSafe scales from local nonprofits to large networks'
                    width={526}
                    height={450}
                    className='h-auto w-full'
                  />
                </div>
                {/* Content Right Block */}
                <div
                  className='jos order-1 md:order-2'
                  data-jos_animation='fade-right'
                >
                  {/* Section Content Block */}
                  <div className='mb-6'>
                    <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                      Built for every nonprofit size
                    </h2>
                  </div>
                  <div className='text-lg leading-[1.4] lg:text-[21px]'>
                    <p className='mb-7 last:mb-0'>
                      Whether you serve 5 beneficiaries or 5,000,
                      BenefitsSafe scales with your mission. Our Community
                      tier is free forever &mdash; because protecting
                      beneficiaries isn&apos;t a premium feature.
                    </p>
                    <p className='mb-7 last:mb-0'>
                      Micro nonprofits run 10 beneficiaries with daily
                      monitoring on the free tier. Growing orgs scale to 500
                      beneficiaries with full AI monitoring. Enterprise
                      networks get unlimited everything with white-label
                      support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Content Section End (Wider Audience) :::... */}
        {/*...::: Content Section Start (Quick Deploy) :::... */}
        <section id='content-section-deploy'>
          {/* Section Spacer */}
          <div className='pb-20 xl:pb-[150px]'>
            {/* Section Container */}
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1.2fr)_1fr] xl:gap-28 xxl:gap-32'>
                {/* Content Left Block */}
                <div
                  className='jos order-2 overflow-hidden rounded-md'
                  data-jos_animation='fade-left'
                >
                  <Image
                    src='/assets/img_placeholder/homepage-assets/28.webp'
                    alt='BenefitsSafe dashboards for small, medium, and large nonprofits'
                    width={526}
                    height={450}
                    className='h-auto w-full'
                  />
                </div>
                {/* Content Right Block */}
                <div className='jos order-1' data-jos_animation='fade-right'>
                  {/* Section Content Block */}
                  <div className='mb-6'>
                    <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                      Deploy in days, not quarters
                    </h2>
                  </div>
                  <div className='text-lg leading-[1.4] lg:text-[21px]'>
                    <p className='mb-7 last:mb-0'>
                      Most nonprofits are up and running in under a day.
                      Connect your bank, add beneficiaries, issue your first
                      card, and SentinelLayer begins monitoring automatically.
                    </p>
                    <ul className='flex flex-col gap-y-5 font-clashDisplay text-xl font-medium leading-tight tracking-tighter text-black lg:mt-12 lg:text-[28px]'>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width={30}
                            height={30}
                            className='h-full w-full'
                          />
                        </div>
                        Connect your bank account via Stripe
                      </li>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width={30}
                            height={30}
                            className='h-full w-full'
                          />
                        </div>
                        Add beneficiaries and assign grant programs
                      </li>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width={30}
                            height={30}
                            className='h-full w-full'
                          />
                        </div>
                        Issue virtual cards with one click
                      </li>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width={30}
                            height={30}
                            className='h-full w-full'
                          />
                        </div>
                        SentinelLayer monitors 24/7 automatically
                      </li>
                      <li className='flex items-start gap-x-3'>
                        <div className='mt-[2.5px] h-[30px] w-[30px]'>
                          <Image
                            src='/assets/img_placeholder/th-1/check-circle.svg'
                            alt='check-circle'
                            width={30}
                            height={30}
                            className='h-full w-full'
                          />
                        </div>
                        Funder reports generate every week
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Content Section End (Quick Deploy) :::... */}
        {/* Separator */}
        <div className='global-container'>
          <div className='h-[1px] w-full bg-[#EAEDF0]' />
        </div>
        {/* Separator */}
        {/*...::: Content Section Start :::... */}
        <section id='content-section-1'>
          {/* Section Spacer */}
          <div className='pb-20 pt-20 md:pb-36 md:pt-32 lg:pb-28 xl:pb-[220px] xl:pt-[130px] xxl:pt-[200px]'>
            {/* Section Container */}
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_.8fr)_1fr] xl:gap-28 xxl:gap-[134px]'>
                {/* Content Left Block */}
                <div
                  className='jos order-2 mt-16 rounded-md md:order-1 md:mt-0'
                  data-jos_animation='fade-up'
                >
                  <div className="relative h-[494px] rounded-tl-[20px] rounded-tr-[20px] bg-[url('/assets/img_placeholder/homepage-assets/33.png')] bg-cover bg-no-repeat">
                    <Image
                      src='/assets/img_placeholder/homepage-assets/30.webp'
                      alt='BenefitsSafe virtual card with merchant lock'
                      width={320}
                      height={494}
                      className='absolute bottom-0 left-1/2 h-[494px] w-auto max-w-[320px] -translate-x-1/2 object-contain'
                    />
                  </div>
                </div>
                {/* Content Left Block */}
                {/* Content Right Block */}
                <div
                  className='jos order-1 md:order-2'
                  data-jos_animation='fade-right'
                >
                  {/* Section Content Block */}
                  <div className='mb-6'>
                    <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                      Virtual cards with real controls
                    </h2>
                  </div>
                  {/* Section Content Block */}
                  <div className='text-lg leading-[1.66]'>
                    <p className='mb-7 last:mb-0'>
                      Issue Stripe-powered Visa debit cards with merchant
                      category blocking, spending limits, and time-based
                      curfews. Cards are active in seconds and can be frozen
                      or canceled instantly.
                    </p>
                    <ul className='mt-12 flex flex-col gap-y-6 font-clashDisplay text-[22px] font-medium leading-[1.28] tracking-[1px] lg:text-[28px]'>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Block merchants by category (MCC)
                      </li>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Set per-card spending limits and curfews
                      </li>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Freeze or cancel cards instantly
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Content Right Block */}
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Content Section End :::... */}
        {/*...::: Content Section Start :::... */}
        <section id='content-section-2'>
          {/* Section Spacer */}
          <div className='pb-20 md:pb-36 lg:pb-28 xl:pb-[220px]'>
            {/* Section Container */}
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1fr)_.8fr] xl:gap-28 xxl:gap-[134px]'>
                {/* Content Right Block */}
                <div
                  className='jos order-2 mt-16 rounded-md md:mt-0'
                  data-jos_animation='fade-up'
                >
                  <div className="relative h-[494px] rounded-tl-[20px] rounded-tr-[20px] bg-[url('/assets/img_placeholder/homepage-assets/33.png')] bg-cover bg-no-repeat">
                    <Image
                      src='/assets/img_placeholder/homepage-assets/29.webp'
                      alt='BenefitsSafe organization setup in 3 steps'
                      width={320}
                      height={494}
                      className='absolute bottom-0 left-1/2 h-[494px] w-auto max-w-[320px] -translate-x-1/2 object-contain'
                    />
                  </div>
                </div>
                {/* Content Right Block */}
                {/* Content Left Block */}
                <div className='jos order-1' data-jos_animation='fade-right'>
                  {/* Section Content Block */}
                  <div className='mb-6'>
                    <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                      Restricted funds, tracked to the penny
                    </h2>
                  </div>
                  {/* Section Content Block */}
                  <div className='text-lg leading-[1.66]'>
                    <p className='mb-7 last:mb-0'>
                      Track every grant with budget categories, approved
                      vendors, and spending caps. Know exactly how much is
                      allocated, spent, and remaining &mdash; in real time.
                    </p>
                    <ul className='mt-12 flex flex-col gap-y-6 font-clashDisplay text-[22px] font-medium leading-[1.28] tracking-[1px] lg:text-[28px]'>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Grant-level budget categories
                      </li>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Approved-vendor enforcement
                      </li>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Immutable audit ledger
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Content Left Block */}
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Content Section End :::... */}
        {/*...::: Content Section Start :::... */}
        <section id='content-section-3'>
          {/* Section Spacer */}
          <div className='pb-20 md:pb-36 lg:pb-28 xl:pb-[150px]'>
            {/* Section Container */}
            <div className='global-container'>
              <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_.8fr)_1fr] xl:gap-28 xxl:gap-[134px]'>
                {/* Content Left Block */}
                <div
                  className='jos order-2 mt-16 rounded-md md:order-1 md:mt-0'
                  data-jos_animation='fade-up'
                >
                  <div className="relative h-[494px] rounded-tl-[20px] rounded-tr-[20px] bg-[url('/assets/img_placeholder/homepage-assets/33.png')] bg-cover bg-no-repeat">
                    <Image
                      src='/assets/img_placeholder/homepage-assets/23.webp'
                      alt='BenefitsSafe community benefits ecosystem'
                      width={320}
                      height={494}
                      className='absolute bottom-0 left-1/2 h-[494px] w-auto max-w-[320px] -translate-x-1/2 object-contain'
                    />
                  </div>
                </div>
                {/* Content Left Block */}
                {/* Content Right Block */}
                <div
                  className='jos order-1 md:order-2'
                  data-jos_animation='fade-right'
                >
                  {/* Section Content Block */}
                  <div className='mb-6'>
                    <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                      SentinelLayer never sleeps
                    </h2>
                  </div>
                  {/* Section Content Block */}
                  <div className='mb-12 text-lg leading-[1.66]'>
                    <p className='mb-7 last:mb-0'>
                      Five autonomous AI agents run 24/7, monitoring SSI,
                      SSDI, Medi-Cal, and CalFresh thresholds for every
                      beneficiary. If someone approaches a limit, the system
                      alerts their case manager with specific numbers and
                      recommended actions &mdash; automatically.
                    </p>
                    <p className='mb-7 last:mb-0'>
                      Real-time MCC blocking, 6-hour deep compliance scans,
                      and auto-drafted funder reports. Your staff can leave.
                      Your compliance never does.
                    </p>
                  </div>
                  <Link
                    rel='noopener noreferrer'
                    href='#'
                    className='button relative z-[1] inline-flex items-center gap-3 rounded-[50px] border-none bg-colorViolet py-[18px] text-white after:bg-colorViolet hover:text-white'
                  >
                    Meet SentinelLayer
                    <Image
                      src='/assets/img_placeholder/th-2/icon-white-long-arrow-right.svg'
                      alt='arrow-right'
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
                {/* Content Right Block */}
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Content Section End :::... */}
        {/*...::: Content Section Start :::... */}
        <section id='content-intregrates-section'>
          <div className='relative z-[1] overflow-hidden bg-colorCodGray text-white'>
            {/* Section Spacer */}
            <div className='py-20 xl:py-[130px]'>
              {/* Section Spacer */}
              <div className='global-container'>
                <div className='grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20 xl:grid-cols-[minmax(0,_1fr)_.8fr] xl:gap-28 xxl:gap-[134px]'>
                  <div className='jos'>
                    {/* Section Content Block */}
                    <div className='mb-6'>
                      <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                        Connects to tools your team already uses
                      </h2>
                    </div>
                    {/* Section Content Block */}
                    <p className='mb-7 last:mb-0'>
                      Composio workflow automation links BenefitsSafe to
                      Gmail, Slack, Google Calendar, and Sheets. When an
                      expense is approved or a threshold is triggered, your
                      team is notified automatically.
                    </p>
                    <ul className='my-12 flex flex-col gap-y-6 font-clashDisplay text-[22px] font-medium leading-[1.28] tracking-[1px] lg:text-[28px]'>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        13 validated ecosystem flows
                      </li>
                      <li className='relative pl-[35px] after:absolute after:left-[10px] after:top-3 after:h-[15px] after:w-[15px] after:rounded-[50%] after:bg-colorViolet'>
                        Automated alerts, summaries, and handoffs
                      </li>
                    </ul>
                    <Link
                      rel='noopener noreferrer'
                      href='/services'
                      className='button relative z-[1] inline-flex items-center gap-3 rounded-[50px] border-none bg-colorViolet py-[18px] text-white after:bg-colorViolet hover:text-white'
                    >
                      Explore Integrations
                      <Image
                        src='/assets/img_placeholder/th-2/icon-white-long-arrow-right.svg'
                        alt='arrow-right'
                        width={24}
                        height={24}
                      />
                    </Link>
                  </div>
                  <div className='flex flex-col gap-6 overflow-hidden rounded-[30px] bg-gradient-to-t from-[rgba(255,255,255,.1)] to-[rgba(0,0,0,0.5)] py-[124px]'>
                    {/* Logo Horizontal Animation */}
                    <div className='horizontal-slide-from-right-to-left flex w-[516px] gap-x-6'>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/slack.png'
                          alt='Slack'
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/gmail.webp'
                          alt='Gmail'
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/google-calender.png'
                          alt='Google Calendar'
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/google-sheets.png'
                          alt='Google Sheets'
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    {/* Logo Horizontal Animation */}
                    {/* Logo Horizontal Animation */}
                    <div className='horizontal-slide-from-left-to-right flex w-[516px] gap-x-6'>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/slack.png'
                          alt='Slack'
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/gmail.webp'
                          alt='Gmail'
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/google-calender.png'
                          alt='Google Calendar'
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className='flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-white'>
                        <Image
                          src='/assets/img_placeholder/integration-icons/google-sheets.png'
                          alt='Google Sheets'
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    {/* Logo Horizontal Animation */}
                  </div>
                </div>
              </div>
              {/* Section Spacer */}
            </div>
            {/* Section Spacer */}
            <div className='absolute left-1/2 top-[80%] -z-[1] h-[1280px] w-[1280px] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#1D4ED8] to-[#2563EB] blur-[250px]'></div>
          </div>
        </section>
        {/*...::: Content Section End :::... */}
        {/*...::: Funfact Section Start :::... */}
        <section id='funfact-section'>
          <div className='mx-auto max-w-[1500px] px-5 py-20 xl:py-[130px]'>
            <div className='jos grid grid-cols-1 overflow-hidden rounded-[30px] bg-colorCodGray lg:rounded-[50px] xl:grid-cols-[minmax(400px,_1fr)_1.5fr] xxl:grid-cols-[1fr_minmax(800px,_1fr)]'>
              {/* Funfact Left Block */}
              <div className='relative overflow-hidden rounded-[30px] lg:rounded-[50px]'>
                <Image
                  src='/assets/img_placeholder/homepage-assets/35.webp'
                  alt='BenefitsSafe protecting beneficiary families'
                  width={721}
                  height={784}
                  className='h-80 w-full object-cover object-center lg:h-[35rem] xl:h-full'
                />
              </div>
              {/* Funfact Right Block */}
              <div className='self-center px-6 py-16 sm:py-20 md:px-16 xl:px-10 xl:py-24 xxl:py-32 xxl:pl-16 xxl:pr-28'>
                <div className='mb-8 lg:mb-16 xl:mb-6'>
                  <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                    Protecting benefits at scale
                  </h2>
                </div>
                <div className='text-left text-lg leading-[1.4] text-white lg:text-[21px]'>
                  <p className='mb-7 last:mb-0'>
                    BenefitsSafe is built for the 1.9 million US nonprofits
                    managing restricted funds for beneficiaries who rely on
                    SSI, SSDI, Medi-Cal, and CalFresh &mdash; and autonomous
                    monitoring keeps every dollar compliant, all day every day.
                  </p>
                </div>
                {/* Horizontal Separator */}
                <div className='my-14 h-[1px] w-full bg-[#2A2A2A]'></div>
                {/* Counter Scroll */}
                <ul className='flex flex-col justify-center gap-x-11 gap-y-8 text-center sm:flex-row md:text-left xl:justify-normal xl:text-left xxl:gap-x-20'>
                  <li>
                    <h3 className='font-clashDisplay text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-7xl xxl:text-[120px]'>
                      1.9M+
                    </h3>
                    <span className='block text-lg font-normal text-white lg:text-[21px]'>
                      US nonprofits we&apos;re built to serve
                    </span>
                  </li>
                  <li>
                    <h3 className='font-clashDisplay text-5xl text-colorViolet md:text-6xl lg:text-7xl xl:text-7xl xxl:text-[120px]'>
                      24/7
                    </h3>
                    <span className='block text-lg font-normal text-white lg:text-[21px]'>
                      Autonomous compliance monitoring
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/*...::: Funfact Section End :::... */}
        {/*...::: Testimonial Section Start :::... */}
        <section id='testimonial-section'>
          {/* Section Spacer */}
          <div className='py-20 xl:py-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Voices from the field
                </h2>
              </div>
              {/* Section Content Block */}

              {/* Testimonial Carousel */}
              <Swiper
                modules={[Navigation]}
                loop={true}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className='jos testimonial-slider relative z-[1]'
              >
                <SwiperSlide>
                  <div className='flex flex-col gap-x-16 md:flex-row lg:gap-x-28 items-center xxl:items-baseline xl:gap-x-[134px]'>
                    <div className='h-auto w-[300px] self-center overflow-hidden rounded-[10px] lg:w-[375px] xl:h-[494px] xl:w-[526px]'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-5.webp'
                        alt='Program Director testimonial'
                        width={526}
                        height={494}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    </div>
                    <div className='mt-[30px] flex-1 text-center md:text-left'>
                      <div className='mb-5 font-clashDisplay text-2xl font-medium leading-[1.28] tracking-[1px] lg:mb-9 lg:text-[28px]'>
                        &ldquo;We used to spend 20 hours a month on grant
                        compliance reports.&rdquo;
                      </div>
                      <p className='mb-9 leading-[1.33] lg:mb-[50px] lg:text-lg xl:text-2xl'>
                        Now they&apos;re ready when I log in Monday morning.
                        Every transaction, every category, every beneficiary
                        &mdash; already summarized, already compliant,
                        already grouped by funder. We just add narrative
                        and send.
                      </p>
                      <div className='text-[21px] font-semibold leading-[1.42]'>
                        Program Director
                        <span className='mt-1 block text-lg font-normal leading-[1.66]'>
                          Housing Nonprofit
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className='flex flex-col gap-x-16 md:flex-row lg:gap-x-28 items-center xxl:items-baseline xl:gap-x-[134px]'>
                    <div className='h-auto w-[300px] self-center overflow-hidden rounded-[10px] lg:w-[375px] xl:h-[494px] xl:w-[526px]'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-6.jpg'
                        alt='Case Manager testimonial'
                        width={526}
                        height={494}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    </div>
                    <div className='mt-[30px] flex-1 text-center md:text-left'>
                      <div className='mb-5 font-clashDisplay text-2xl font-medium leading-[1.28] tracking-[1px] lg:mb-9 lg:text-[28px]'>
                        &ldquo;BenefitsSafe caught it before we did.&rdquo;
                      </div>
                      <p className='mb-9 leading-[1.33] lg:mb-[50px] lg:text-lg xl:text-2xl'>
                        A beneficiary&apos;s family deposited a birthday
                        check that almost pushed her over the SSI resource
                        limit. The Watchdog flagged it with exact numbers
                        and a recommended action. We called her the same
                        day and kept her benefits intact.
                      </p>
                      <div className='text-[21px] font-semibold leading-[1.42]'>
                        Case Manager
                        <span className='mt-1 block text-lg font-normal leading-[1.66]'>
                          Disability Services
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                {/* If we need navigation buttons */}
                <div className='testimonial-nav'>
                  <button
                    onClick={() => swiperRef.current.slidePrev()}
                    className='testimonial-nav-prev testimonial-nav-dir'
                  >
                    <Image
                      src='/assets/img_placeholder/th-2/icon-black-long-arrow-left.svg'
                      alt='icon-black-long-arrow-left'
                      width={24}
                      height={24}
                    />
                    <Image
                      src='/assets/img_placeholder/th-2/icon-white-long-arrow-left.svg'
                      alt='icon-white-long-arrow-left'
                      width={24}
                      height={24}
                    />
                  </button>
                  <button
                    onClick={() => swiperRef.current.slideNext()}
                    className='testimonial-nav-next testimonial-nav-dir'
                  >
                    <Image
                      src='/assets/img_placeholder/th-2/icon-black-long-arrow-right.svg'
                      alt='icon-black-long-arrow-right'
                      width={24}
                      height={24}
                    />
                    <Image
                      src='/assets/img_placeholder/th-2/icon-white-long-arrow-right.svg'
                      alt='icon-white-long-arrow-right'
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              </Swiper>

              {/* Testimonial Carousel */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Testimonial Section Start :::... */}
        {/* Separator */}
        <div className='global-container'>
          <div className='h-[1px] w-full bg-[#EAEDF0]' />
        </div>
        {/* Separator */}
        {/*...::: Testimonial Grid Section Start :::... */}
        <section id='testimonial-grid-section' className='testimonial-section'>
          {/* Section Spacer */}
          <div className='bg-colorCodGray pb-40 pt-20 xl:pb-[200px] xl:pt-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mb-10 text-center lg:mb-16 xl:mb-20'>
                <div className='mx-auto max-w-[300px] lg:max-w-[600px] xl:max-w-[680px]'>
                  <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] text-white sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                    What our partners are saying
                  </h2>
                </div>
              </div>
              {/* Testimonial List */}
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                <div
                  className='jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-[#2A2A2A] p-[30px] text-white'
                  data-jos_animation='fade-left'
                  data-jos_delay='0.1'
                >
                  <Image
                    src='/assets/img_placeholder/th-1-violet/rating.svg'
                    alt='rating'
                    width={146}
                    height={25}
                  />
                  <p>
                    &ldquo;We switched from paper checks to virtual cards and
                    cut our disbursement time from 2 weeks to 2 minutes.&rdquo;
                  </p>
                  <div className='flex items-center gap-x-4'>
                    <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-1.jpg'
                        alt='Finance Director testimonial'
                        width={60}
                        height={60}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span className='block text-lg font-semibold leading-[1.6]'>
                        Finance Director
                      </span>
                      <span className='block text-sm font-light leading-[1.4]'>
                        Community Foundation
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className='jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-[#2A2A2A] p-[30px] text-white'
                  data-jos_animation='fade-left'
                  data-jos_delay='0.2'
                >
                  <Image
                    src='/assets/img_placeholder/th-1-violet/rating.svg'
                    alt='rating'
                    width={146}
                    height={25}
                  />
                  <p>
                    &ldquo;The free tier gave us everything we needed to
                    start. When we grew past 10 beneficiaries, upgrading was
                    a no-brainer.&rdquo;
                  </p>
                  <div className='flex items-center gap-x-4'>
                    <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-2.jpg'
                        alt='Executive Director testimonial'
                        width={60}
                        height={60}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span className='block text-lg font-semibold leading-[1.6]'>
                        Executive Director
                      </span>
                      <span className='block text-sm font-light leading-[1.4]'>
                        Mutual Aid Collective
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className='jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-[#2A2A2A] p-[30px] text-white'
                  data-jos_animation='fade-left'
                  data-jos_delay='0.3'
                >
                  <Image
                    src='/assets/img_placeholder/th-1-violet/rating.svg'
                    alt='rating'
                    width={146}
                    height={25}
                  />
                  <p>
                    &ldquo;Our last case manager left with six months of
                    client knowledge. With BenefitsSafe, the system
                    remembers everything.&rdquo;
                  </p>
                  <div className='flex items-center gap-x-4'>
                    <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-3.jpg'
                        alt='Operations Manager testimonial'
                        width={60}
                        height={60}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span className='block text-lg font-semibold leading-[1.6]'>
                        Operations Manager
                      </span>
                      <span className='block text-sm font-light leading-[1.4]'>
                        Social Services Agency
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className='jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-[#2A2A2A] p-[30px] text-white'
                  data-jos_animation='fade-left'
                  data-jos_delay='0.1'
                >
                  <Image
                    src='/assets/img_placeholder/th-1-violet/rating.svg'
                    alt='rating'
                    width={146}
                    height={25}
                  />
                  <p>
                    &ldquo;True Link wanted $600/month for 50 cards.
                    BenefitsSafe gives us 50 cards for $49.&rdquo;
                  </p>
                  <div className='flex items-center gap-x-4'>
                    <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-4.jpg'
                        alt='Treasurer testimonial'
                        width={60}
                        height={60}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span className='block text-lg font-semibold leading-[1.6]'>
                        Treasurer
                      </span>
                      <span className='block text-sm font-light leading-[1.4]'>
                        Faith-Based Nonprofit
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className='jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-[#2A2A2A] p-[30px] text-white'
                  data-jos_animation='fade-left'
                  data-jos_delay='0.2'
                >
                  <Image
                    src='/assets/img_placeholder/th-1-violet/rating.svg'
                    alt='rating'
                    width={146}
                    height={25}
                  />
                  <p>
                    &ldquo;We used to spend 20 hours a month on grant
                    compliance reports. Now they&apos;re ready when I log in
                    Monday morning.&rdquo;
                  </p>
                  <div className='flex items-center gap-x-4'>
                    <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-5.webp'
                        alt='Program Director testimonial'
                        width={60}
                        height={60}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span className='block text-lg font-semibold leading-[1.6]'>
                        Program Director
                      </span>
                      <span className='block text-sm font-light leading-[1.4]'>
                        Housing Nonprofit
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className='jos flex flex-col gap-y-8 rounded-[10px] border-[1px] border-[#2A2A2A] p-[30px] text-white'
                  data-jos_animation='fade-left'
                  data-jos_delay='0.3'
                >
                  <Image
                    src='/assets/img_placeholder/th-1-violet/rating.svg'
                    alt='rating'
                    width={146}
                    height={25}
                  />
                  <p>
                    &ldquo;A beneficiary&apos;s family deposited a birthday
                    check that almost pushed her over the SSI limit.
                    BenefitsSafe caught it before we did.&rdquo;
                  </p>
                  <div className='flex items-center gap-x-4'>
                    <div className='h-[60px] w-[60px] overflow-hidden rounded-full'>
                      <Image
                        src='/assets/img_placeholder/homepage-assets/face-6.jpg'
                        alt='Case Manager testimonial'
                        width={60}
                        height={60}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span className='block text-lg font-semibold leading-[1.6]'>
                        Case Manager
                      </span>
                      <span className='block text-sm font-light leading-[1.4]'>
                        Disability Services
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Testimonial Grid Section End :::... */}
        {/*...::: Pricing Section Start :::... */}
        <section className='pricing-section'>
          {/* Section Spacer */}
          <div className='pb-20 pt-20 xl:pb-[150px] xl:pt-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mb-10 text-center lg:mb-12'>
                <div className='mx-auto md:max-w-xs lg:max-w-xl xl:max-w-[746px]'>
                  <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                    Pricing that scales with your mission
                  </h2>
                  <p className='mt-6 text-lg'>
                    Community is free forever. See{' '}
                    <Link
                      href='/pricing'
                      className='font-semibold text-colorViolet underline'
                    >
                      all 5 plans
                    </Link>
                    {' '}&mdash; including free Community and custom Enterprise.
                  </p>
                </div>
              </div>
              {/* Pricing Block */}
              <div className='container mx-auto'>
                {/* Tab buttons */}
                <div className='jos flex justify-center' data-jos_animation='fade'>
                  <div className='inline-flex space-x-4 rounded-[50px] border-2 border-colorCodGray font-semibold'>
                    <button
                      className={`tab-button price-button ${activeTab === 0 ? 'active' : ''}`}
                      onClick={() => handleTab(0)}
                      data-tab='monthly'
                    >
                      Monthly
                    </button>
                    <button
                      className={`tab-button price-button ${activeTab === 1 ? 'active' : ''}`}
                      onClick={() => handleTab(1)}
                      data-tab='annually'
                    >
                      Annually
                    </button>
                  </div>
                </div>
                {/* Pricing Block */}
                <div className='mt-12 lg:mt-16 xl:mt-20'>
                  {activeTab === 0 && (
                    <ul
                      id='monthly'
                      className='tab-content grid grid-cols-1 gap-6 md:grid-cols-2 xxl:grid-cols-3'
                    >
                      <li
                        className='jos group flex flex-col rounded-[10px] bg-white p-10 shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-linear hover:bg-colorCodGray'
                        data-jos_animation='flip'
                        data-jos_delay='0'
                      >
                        <h3 className='font-clashDisplay text-[28px] font-medium leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Seed
                        </h3>
                        <span className='text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Up to 50 beneficiaries
                        </span>
                        <div className='my-5 h-[1px] w-full bg-[#EAEDF0]'></div>
                        <h4 className='mb-4 font-clashDisplay text-5xl font-medium leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]'>
                          $49
                          <span className='text-lg font-semibold'>/Per month</span>
                        </h4>
                        <p className='mb-10 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          For small nonprofits and fiscal sponsors running their first restricted-fund grants.
                        </p>
                        <a
                          href='https://app.benefitssafe.com/api/billing/checkout-direct?plan=seed'
                          className='button mt-auto block rounded-[50px] border-2 border-colorCodGray bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white'
                        >
                          Start Free Trial
                        </a>
                      </li>
                      <li
                        className='jos group flex flex-col rounded-[10px] bg-white p-10 shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-linear hover:bg-colorCodGray'
                        data-jos_animation='flip'
                        data-jos_delay='0'
                      >
                        <h3 className='font-clashDisplay text-[28px] font-medium leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Core
                        </h3>
                        <span className='text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Up to 200 beneficiaries
                        </span>
                        <div className='my-5 h-[1px] w-full bg-[#EAEDF0]'></div>
                        <h4 className='mb-4 font-clashDisplay text-5xl font-medium leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]'>
                          $99
                          <span className='text-lg font-semibold'>/Per month</span>
                        </h4>
                        <p className='mb-10 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Growing organizations that need compliance automation, virtual cards, and vendor onboarding.
                        </p>
                        <a
                          href='https://app.benefitssafe.com/api/billing/checkout-direct?plan=core'
                          className='button mt-auto block rounded-[50px] border-2 border-colorCodGray bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white'
                        >
                          Start Free Trial
                        </a>
                      </li>
                      <li
                        className='jos group flex flex-col rounded-[10px] bg-white p-10 shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-linear hover:bg-colorCodGray'
                        data-jos_animation='flip'
                        data-jos_delay='0'
                      >
                        <h3 className='font-clashDisplay text-[28px] font-medium leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Network
                        </h3>
                        <span className='text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Up to 500 beneficiaries
                        </span>
                        <div className='my-5 h-[1px] w-full bg-[#EAEDF0]'></div>
                        <h4 className='mb-4 font-clashDisplay text-5xl font-medium leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]'>
                          $199
                          <span className='text-lg font-semibold'>/Per month</span>
                        </h4>
                        <p className='mb-10 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Larger networks and statewide sponsors managing multi-grant, multi-org compliance.
                        </p>
                        <a
                          href='https://app.benefitssafe.com/api/billing/checkout-direct?plan=network'
                          className='button mt-auto block rounded-[50px] border-2 border-colorCodGray bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white'
                        >
                          Start Free Trial
                        </a>
                      </li>
                    </ul>
                  )}
                  {activeTab === 1 && (
                    <ul
                      id='annually'
                      className='tab-content grid grid-cols-1 gap-6 md:grid-cols-2 xxl:grid-cols-3'
                    >
                      <li
                        className='jos group flex flex-col rounded-[10px] bg-white p-10 shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-linear hover:bg-colorCodGray'
                        data-jos_animation='flip'
                        data-jos_delay='0'
                      >
                        <h3 className='font-clashDisplay text-[28px] font-medium leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Seed
                        </h3>
                        <span className='text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Up to 50 beneficiaries
                        </span>
                        <div className='my-5 h-[1px] w-full bg-[#EAEDF0]'></div>
                        <h4 className='mb-4 font-clashDisplay text-5xl font-medium leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]'>
                          $470
                          <span className='text-lg font-semibold'>/Per year</span>
                        </h4>
                        <p className='mb-10 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          For small nonprofits and fiscal sponsors running their first restricted-fund grants.
                        </p>
                        <a
                          href='https://app.benefitssafe.com/api/billing/checkout-direct?plan=seed'
                          className='button mt-auto block rounded-[50px] border-2 border-colorCodGray bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white'
                        >
                          Start Free Trial
                        </a>
                      </li>
                      <li
                        className='jos group flex flex-col rounded-[10px] bg-white p-10 shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-linear hover:bg-colorCodGray'
                        data-jos_animation='flip'
                        data-jos_delay='0'
                      >
                        <h3 className='font-clashDisplay text-[28px] font-medium leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Core
                        </h3>
                        <span className='text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Up to 200 beneficiaries
                        </span>
                        <div className='my-5 h-[1px] w-full bg-[#EAEDF0]'></div>
                        <h4 className='mb-4 font-clashDisplay text-5xl font-medium leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]'>
                          $950
                          <span className='text-lg font-semibold'>/Per year</span>
                        </h4>
                        <p className='mb-10 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Growing organizations that need compliance automation, virtual cards, and vendor onboarding.
                        </p>
                        <a
                          href='https://app.benefitssafe.com/api/billing/checkout-direct?plan=core'
                          className='button mt-auto block rounded-[50px] border-2 border-colorCodGray bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white'
                        >
                          Start Free Trial
                        </a>
                      </li>
                      <li
                        className='jos group flex flex-col rounded-[10px] bg-white p-10 shadow-[0_4px_60px_0_rgba(0,0,0,0.08)] transition-all duration-300 ease-linear hover:bg-colorCodGray'
                        data-jos_animation='flip'
                        data-jos_delay='0'
                      >
                        <h3 className='font-clashDisplay text-[28px] font-medium leading-[1.28] tracking-tighter text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Network
                        </h3>
                        <span className='text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Up to 500 beneficiaries
                        </span>
                        <div className='my-5 h-[1px] w-full bg-[#EAEDF0]'></div>
                        <h4 className='mb-4 font-clashDisplay text-5xl font-medium leading-none text-black transition-all duration-300 ease-linear group-hover:text-white md:text-6xl lg:text-7xl xl:text-[80px]'>
                          $1910
                          <span className='text-lg font-semibold leading-none'>/Per year</span>
                        </h4>
                        <p className='mb-10 text-lg text-black transition-all duration-300 ease-linear group-hover:text-white'>
                          Larger networks and statewide sponsors managing multi-grant, multi-org compliance.
                        </p>
                        <a
                          href='https://app.benefitssafe.com/api/billing/checkout-direct?plan=network'
                          className='button mt-auto block rounded-[50px] border-2 border-colorCodGray bg-transparent py-4 text-center text-black transition-all duration-300 ease-linear after:bg-colorViolet hover:border-colorViolet hover:text-black group-hover:border-colorViolet group-hover:text-white'
                        >
                          Start Free Trial
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*...::: Pricing Section End :::... */}
        {/* Separator */}
        <div className='global-container'>
          <div className='h-[1px] w-full bg-[#EAEDF0]' />
        </div>
        {/* Separator */}
        {/*...::: Blog Section Start :::... */}
        <div id='blog-section'>
          {/* Section Spacer */}
          <div className='py-20 xl:py-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mx-0 lg:mb-20 lg:max-w-[636px] lg:text-left'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  From the BenefitsSafe blog
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Blog List */}
              <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                {/* Blog Post Single Item */}
                <article
                  className='jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]'
                  data-jos_delay='0.1'
                >
                  {/* Blog Image */}
                  <Link
                    href='/blog/virtual-cards-ssi'
                    className='block h-[320px] w-full overflow-hidden rounded-[30px]'
                  >
                    <Image
                      src='/assets/img_placeholder/homepage-assets/24.webp'
                      alt='virtual card protecting SSI'
                      width={416}
                      height={320}
                      className='h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105'
                    />
                  </Link>
                  {/* Blog Image */}
                  {/* Blog Content */}
                  <div className='p-6'>
                    <h5 className='mb-7 font-clashDisplay font-medium leading-[1.28] tracking-[1px] text-[28] hover:text-colorViolet'>
                      <Link href='/blog/virtual-cards-ssi'>
                        How Virtual Cards Protect SSI Beneficiaries from
                        Losing Benefits
                      </Link>
                    </h5>
                    <div className='flex items-center justify-between gap-x-4'>
                      <span>23 June 2024</span>
                      <Link href='/blog/virtual-cards-ssi' className='h-[30px] w-[30px]'>
                        <Image
                          src='/assets/img_placeholder//th-2/icon-blue-long-arrow-right.svg'
                          alt='arrow-right'
                          width={30}
                          height={30}
                          className='transition-all duration-300 group-hover:-rotate-45'
                        />
                      </Link>
                    </div>
                  </div>
                  {/* Blog Content */}
                </article>
                {/* Blog Post Single Item */}
                {/* Blog Post Single Item */}
                <article
                  className='jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]'
                  data-jos_delay='0.2'
                >
                  {/* Blog Image */}
                  <Link
                    href='/blog/paper-check-costs'
                    className='block h-[320px] w-full overflow-hidden rounded-[30px]'
                  >
                    <Image
                      src='/assets/img_placeholder/homepage-assets/26.webp'
                      alt='paper check disbursements'
                      width={416}
                      height={320}
                      className='h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105'
                    />
                  </Link>
                  {/* Blog Image */}
                  {/* Blog Content */}
                  <div className='p-6'>
                    <h5 className='mb-7 font-clashDisplay font-medium leading-[1.28] tracking-[1px] text-[28] hover:text-colorViolet'>
                      <Link href='/blog/paper-check-costs'>
                        The True Cost of Paper Check Disbursements for
                        Nonprofits
                      </Link>
                    </h5>
                    <div className='flex items-center justify-between gap-x-4'>
                      <span>20 June 2024</span>
                      <Link href='/blog/paper-check-costs' className='h-[30px] w-[30px]'>
                        <Image
                          src='/assets/img_placeholder//th-2/icon-blue-long-arrow-right.svg'
                          alt='arrow-right'
                          width={30}
                          height={30}
                          className='transition-all duration-300 group-hover:-rotate-45'
                        />
                      </Link>
                    </div>
                  </div>
                  {/* Blog Content */}
                </article>
                {/* Blog Post Single Item */}
                {/* Blog Post Single Item */}
                <article
                  className='jos group overflow-hidden rounded-[10px] bg-white shadow-[0_4px_80px_rgba(0,0,0,0.08)]'
                  data-jos_delay='0.3'
                >
                  {/* Blog Image */}
                  <Link
                    href='/blog/ssi-asset-limits-2025'
                    className='block h-[320px] w-full overflow-hidden rounded-[30px]'
                  >
                    <Image
                      src='/assets/img_placeholder/homepage-assets/36.webp'
                      alt='SSI asset limits 2025'
                      width={416}
                      height={320}
                      className='h-full w-full scale-100 object-cover transition-all duration-300 group-hover:scale-105'
                    />
                  </Link>
                  {/* Blog Image */}
                  {/* Blog Content */}
                  <div className='p-6'>
                    <h5 className='mb-7 font-clashDisplay font-medium leading-[1.28] tracking-[1px] text-[28] hover:text-colorViolet'>
                      <Link href='/blog/ssi-asset-limits-2025'>
                        What Every Case Manager Should Know About SSI
                        Asset Limits in 2025
                      </Link>
                    </h5>
                    <div className='flex items-center justify-between gap-x-4'>
                      <span>18 June 2024</span>
                      <Link href='/blog/ssi-asset-limits-2025' className='h-[30px] w-[30px]'>
                        <Image
                          src='/assets/img_placeholder//th-2/icon-blue-long-arrow-right.svg'
                          alt='arrow-right'
                          width={30}
                          height={30}
                          className='transition-all duration-300 group-hover:-rotate-45'
                        />
                      </Link>
                    </div>
                  </div>
                  {/* Blog Content */}
                </article>
                {/* Blog Post Single Item */}
              </div>
              {/* Blog List */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </div>
        {/*...::: Blog Section Start :::... */}
        {/*...::: Ask-Us FAQ Section Start :::... */}
        <section id='ask-us-section' className='faq-section'>
          {/* Section Spacer */}
          <div className='py-20 xl:py-[130px]'>
            {/* Section Container */}
            <div className='global-container'>
              <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2'>
                {/* FAQ Left Block */}
                <div
                  className='jos flex flex-col'
                  data-jos_animation='fade-right'
                >
                  <div className='mb-6'>
                    <div className='mx-auto md:mx-0 md:max-w-none'>
                      <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                        Freely ask us for more information
                      </h2>
                    </div>
                  </div>
                  <div className='text-lg leading-[1.4] lg:text-[21px]'>
                    <p className='mb-7 last:mb-0'>
                      Our team is ready to walk you through compliance, onboarding,
                      and how BenefitsSafe fits your grant workflow. Whether
                      you&apos;re running your first grant or disbursing at scale,
                      we can help.
                    </p>
                    <Link
                      href='/faq'
                      className='button mt-5 rounded-[50px] border-2 border-colorCodGray bg-colorCodGray py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white'
                    >
                      Ask your questions
                    </Link>
                  </div>
                </div>
                {/* FAQ Right Block */}
                <div
                  className='jos md:ml-10 lg:ml-20 xl:ml-32'
                  data-jos_animation='fade-left'
                >
                  <ul className='accordion'>
                    <li
                      className={`accordion-item border-b-[1px] border-[#EAEDF0] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
                        askIndex === 0 ? 'active' : ''
                      }`}
                      onClick={() => handleAsk(0)}
                    >
                      <div className='accordion-header flex items-center justify-between font-clashDisplay text-xl font-medium leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]'>
                        <p>How do I get started with BenefitsSafe?</p>
                        <div className='accordion-icon'>
                          <Image
                            src='/assets/img_placeholder/plus.svg'
                            width={24}
                            height={24}
                            alt='plus'
                          />
                        </div>
                      </div>
                      <div className='accordion-content text-[#2C2C2C]'>
                        <p>
                          Create an organization account, invite your team, and
                          set up your first grant. Onboarding typically takes a
                          single session &mdash; your first virtual card can be
                          issued the same week.
                        </p>
                      </div>
                    </li>
                    <li
                      className={`accordion-item border-b-[1px] border-[#EAEDF0] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
                        askIndex === 1 ? 'active' : ''
                      }`}
                      onClick={() => handleAsk(1)}
                    >
                      <div className='accordion-header flex items-center justify-between font-clashDisplay text-xl font-medium leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]'>
                        <p>Can I customize compliance rules for my state?</p>
                        <div className='accordion-icon'>
                          <Image
                            src='/assets/img_placeholder/plus.svg'
                            width={24}
                            height={24}
                            alt='plus'
                          />
                        </div>
                      </div>
                      <div className='accordion-content text-[#2C2C2C]'>
                        <p>
                          Federal SSI/SSDI rules are baked in by default. State
                          overlays (Medi-Cal, CalFresh, IHSS, etc.) are available
                          for California today, with additional states rolling out.
                          Custom policy rules can be layered on per-organization.
                        </p>
                      </div>
                    </li>
                    <li
                      className={`accordion-item border-b-[1px] border-[#EAEDF0] pb-6 pt-6 first:pt-0 last:border-b-0 last:pb-0 ${
                        askIndex === 2 ? 'active' : ''
                      }`}
                      onClick={() => handleAsk(2)}
                    >
                      <div className='accordion-header flex items-center justify-between font-clashDisplay text-xl font-medium leading-[1.2] -tracking-[0.5px] text-black lg:text-[28px]'>
                        <p>How does BenefitsSafe protect benefits eligibility?</p>
                        <div className='accordion-icon'>
                          <Image
                            src='/assets/img_placeholder/plus.svg'
                            width={24}
                            height={24}
                            alt='plus'
                          />
                        </div>
                      </div>
                      <div className='accordion-content text-[#2C2C2C]'>
                        <p>
                          Every expense runs through our compliance engine before
                          approval &mdash; classifying risk against SSI, SSDI,
                          Medicaid, and Medi-Cal rules. Direct-to-vendor payments
                          and merchant-locked virtual cards keep money out of a
                          beneficiary&apos;s hands.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: Ask-Us FAQ Section End :::... */}
        {/*...::: FAQ Section Start :::... */}
        <section id='faq-section'>
          {/* Section Spacer */}
          <div className='pb-40 xl:pb-[220px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* Section Content Block */}
              <div className='jos mx-auto mb-10 text-center md:mb-16 md:max-w-xl lg:mb-20 lg:max-w-3xl xl:max-w-[856px]'>
                <h2 className='font-clashDisplay text-4xl font-medium leading-[1.06] sm:text-[44px] lg:text-[56px] xl:text-[75px]'>
                  Questions nonprofits ask us most
                </h2>
              </div>
              {/* Section Content Block */}
              {/* Accordion*/}
              <ul className='accordion flex flex-col gap-y-6'>
                {/* Accordion items */}
                <li
                  className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                    activeIndex === 0 ? 'active' : ''
                  }`}
                  onClick={() => handleAccordion(0)}
                  data-jos_delay='0.1'
                >
                  <div className='accordion-header flex items-center justify-between'>
                    <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                      What is BenefitsSafe?
                    </h5>
                    <div className='accordion-icon is-blue'>
                      <Image
                        src='/assets/img_placeholder/plus.svg'
                        alt='plus'
                        width={24}
                        height={24}
                      />
                      <Image
                        src='/assets/img_placeholder/plus-white.svg'
                        alt='plus-white'
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className='accordion-content text-lg text-[#2C2C2C]'>
                    <p>
                      BenefitsSafe is a fintech compliance platform that
                      helps nonprofits manage restricted grant funds and
                      disburse them via virtual debit cards &mdash; without
                      beneficiaries losing their government benefits like
                      SSI, Medi-Cal, or CalFresh.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
                <li
                  className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                    activeIndex === 1 ? 'active' : ''
                  }`}
                  onClick={() => handleAccordion(1)}
                  data-jos_delay='0.1'
                >
                  <div className='accordion-header flex items-center justify-between'>
                    <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                      How does BenefitsSafe protect beneficiaries?
                    </h5>
                    <div className='accordion-icon is-blue'>
                      <Image
                        src='/assets/img_placeholder/plus.svg'
                        alt='plus'
                        width={24}
                        height={24}
                      />
                      <Image
                        src='/assets/img_placeholder/plus-white.svg'
                        width={24}
                        height={24}
                        alt='plus-white'
                      />
                    </div>
                  </div>
                  <div className='accordion-content text-lg text-[#2C2C2C]'>
                    <p>
                      Our SentinelLayer AI monitors every beneficiary&apos;s
                      financial picture daily across all benefit programs.
                      If someone approaches their SSI asset limit or Medi-Cal
                      income threshold, the system alerts their case manager
                      with specific numbers and recommended actions &mdash;
                      automatically.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
                <li
                  className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                    activeIndex === 2 ? 'active' : ''
                  }`}
                  onClick={() => handleAccordion(2)}
                  data-jos_delay='0.1'
                >
                  <div className='accordion-header flex items-center justify-between'>
                    <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                      Is BenefitsSafe a bank?
                    </h5>
                    <div className='accordion-icon is-blue'>
                      <Image
                        src='/assets/img_placeholder/plus.svg'
                        alt='plus'
                        width={24}
                        height={24}
                      />
                      <Image
                        src='/assets/img_placeholder/plus-white.svg'
                        alt='plus-white'
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className='accordion-content text-lg text-[#2C2C2C]'>
                    <p>
                      No. BenefitsSafe is a software platform. Cards are
                      issued by Stripe&apos;s FDIC-insured bank partners
                      (Sutton Bank and Evolve Bank &amp; Trust). We never
                      hold, transmit, or control your funds.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
                <li
                  className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                    activeIndex === 3 ? 'active' : ''
                  }`}
                  onClick={() => handleAccordion(3)}
                  data-jos_delay='0.1'
                >
                  <div className='accordion-header flex items-center justify-between'>
                    <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                      How much does it cost?
                    </h5>
                    <div className='accordion-icon is-blue'>
                      <Image
                        src='/assets/img_placeholder/plus.svg'
                        alt='plus'
                        width={24}
                        height={24}
                      />
                      <Image
                        src='/assets/img_placeholder/plus-white.svg'
                        alt='plus-white'
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>
                  <div className='accordion-content text-lg text-[#2C2C2C]'>
                    <p>
                      Our Community tier is free forever with 10 beneficiaries
                      and daily monitoring. Paid plans start at $49/month.
                      Compare that to per-card competitors who charge
                      $12/card/month &mdash; at 50 cards, they cost $600/month
                      vs our $49.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
                <li
                  className={`jos accordion-item is-3 rounded-[10px] border-[1px] border-[#EAEDF0] bg-white px-7 py-[30px] ${
                    activeIndex === 4 ? 'active' : ''
                  }`}
                  onClick={() => handleAccordion(4)}
                  data-jos_delay='0.1'
                >
                  <div className='accordion-header flex items-center justify-between'>
                    <h5 className='font-clashDisplay text-xl font-medium leading-[1.2] tracking-[1px] lg:text-[28px]'>
                      How long does setup take?
                    </h5>
                    <div className='accordion-icon is-blue'>
                      <Image
                        width={24}
                        height={24}
                        src='/assets/img_placeholder/plus.svg'
                        alt='plus'
                      />
                      <Image
                        width={24}
                        height={24}
                        src='/assets/img_placeholder/plus-white.svg'
                        alt='plus-white'
                      />
                    </div>
                  </div>
                  <div className='accordion-content text-lg text-[#2C2C2C]'>
                    <p>
                      Most nonprofits are up and running in under a day.
                      Connect your bank account, add beneficiaries, and
                      issue your first virtual card &mdash; all from one
                      dashboard.
                    </p>
                  </div>
                </li>
                {/* Accordion items */}
              </ul>
              {/* Accordion*/}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: FAQ Section End :::... */}
      </main>
      <Footer_02 />
    </div>
  );
}

export default Home;
