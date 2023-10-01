import React, { ReactNode, useEffect, useState } from 'react';
import arrow from '@/assets/images/right-arrow.svg';

interface CarouselProps {
  children: ReactNode[];
  autoPlay?: number | boolean;
}

const Carousel: React.FC<CarouselProps> = ({ children, autoPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  if (autoPlay) {
    useEffect(() => {
      const interval = setInterval(nextSlide, typeof autoPlay === 'number' ? autoPlay : 500);

      return () => clearInterval(interval);
    }, []);
  }

  return (
    <div className="relative overflow-hidden">
      <ul className="flex transition-transform duration-300 ease-in" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => (
          <li
            key={index}
            className="w-full flex-shrink-0"
          >
            {child}
          </li>
        ))}
      </ul>

      <button onClick={prevSlide} className="absolute top-1/2 left-4 p-2 rounded-full transform -translate-y-1/2 z-10 bg-slate-50 opacity-30">
        <img src={arrow.src} alt="Next" width={25} height={25} className='rotate-180' />
      </button>

      <button onClick={nextSlide} className="absolute top-1/2 right-4 p-2 rounded-full transform -translate-y-1/2 z-10 bg-slate-50 opacity-30">
        <img src={arrow.src} alt="Next" width={25} height={25} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-gray-800 text-white px-2 py-1 rounded">
        {currentIndex + 1} / {children.length}
      </div>
    </div >
  );
};

export default Carousel;
