"use client";
import Carousel from '@/components/root/carousel';
import Banner from '@/components/root/banner';
import Suggest from '@/components/root/suggest';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const sections = [
    // <Banner />,
    // <Carousel />,
    <Suggest />
  ];
  const sectionRefs = sections.map(() => useRef<HTMLElement>(null!));

  useEffect(() => {
    if (window.scrollY < 54 && window.innerWidth >= 768) sectionRefs[0].current.scrollIntoView({ behavior: 'smooth' });

    const onscroll = (e: WheelEvent) => {
      e.preventDefault();
      // console.log(window.scrollY, sectionRefs.map(ref => ref.current.offsetTop));

      const direct = e.deltaY > 0 ? 1 : -1;
      sectionRefs.find(ref => direct * ref.current.offsetTop >= direct * (window.scrollY + 54))?.current?.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('wheel', onscroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', onscroll);
    };
  }, []);

  return (
    <>
      {sections.map((component, idx) => (
        <section key={idx} ref={sectionRefs[idx]} className='md:pt-header-height md:h-screen md:box-border'>
          {component}
        </section>
      ))}
    </>
  );
}
