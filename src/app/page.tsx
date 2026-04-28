'use client';

import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import LiveProjects from '@/components/LiveProjects/LiveProjects';
import ScreenshotSlider from '@/components/ScreenshotSlider/ScreenshotSlider';
import Footer from '@/components/Footer/Footer';
import CustomCursor from '@/components/CustomCursor/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <LiveProjects />
        <ScreenshotSlider />
      </main>
      <Footer />
    </>
  );
}
