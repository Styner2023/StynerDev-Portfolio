import Link from 'next/link';
import Header_02 from '@/components/header/Header_02';
import Footer_02 from '@/components/footer/Footer_02';

function Not_Found() {
  return (
    <div className='page-wrapper relative z-[1] bg-white'>
      <Header_02 />
      <main className='main-wrapper relative overflow-hidden'>
        {/*...::: 404 Section Start :::... */}
        <section id='404-section'>
          {/* Section Spacer */}
          <div className='py-40 pt-36 xl:pb-[200px] xl:pt-[180px]'>
            {/* Section Container */}
            <div className='global-container'>
              {/* 404 Content */}
              <div className='mx-auto max-w-[954px] text-center'>
                <h1 className='bg-gradient-to-br from-colorViolet to-colorCodGray bg-clip-text text-[150px] text-transparent sm:text-[220px] lg:text-[300px] xl:text-[350px]'>
                  404
                </h1>
                <h2 className='mb-[50px]'>
                  The page you are looking for cannot be found
                </h2>
                <Link
                  href='/'
                  className='button rounded-[50px] border-2 border-colorCodGray bg-colorCodGray py-4 text-white after:bg-colorViolet hover:border-colorViolet hover:text-white'
                >
                  Go to homepage
                </Link>
              </div>
              {/* 404 Content */}
            </div>
            {/* Section Container */}
          </div>
          {/* Section Spacer */}
        </section>
        {/*...::: 404 Section End :::... */}
      </main>
      <Footer_02 />
    </div>
  );
}

export default Not_Found;
