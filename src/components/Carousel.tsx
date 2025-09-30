import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number | string;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const safeItemWidth =
    typeof itemWidth === 'number' && itemWidth > 0 ? itemWidth : 130;
  const safeFrameSize = Math.min(Math.max(frameSize, 1), images.length);
  const safeStep = Math.min(Math.max(step, 1), images.length);
  const safeDuration = animationDuration >= 0 ? animationDuration : 1000;
  const maxIndex = Math.max(images.length - safeFrameSize, 0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (infinite && currentIndex === 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(prev => Math.max(prev - safeStep, 0));
    }
  };

  const handleNext = () => {
    if (infinite && currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => Math.min(prev + safeStep, maxIndex));
    }
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__frame"
        style={{
          width: `${safeItemWidth * safeFrameSize}px`,
          height: `${safeItemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            width: `${images.length * safeItemWidth}px`,
            transform: `translateX(-${currentIndex * safeItemWidth}px)`,
            transition: `transform ${safeDuration}ms ease`,
            willChange: 'transform',
            alignItems: 'center',
          }}
        >
          {images.map((src, idx) => (
            <li
              key={idx}
              className="Carousel__item"
              style={{ width: `${safeItemWidth}px`, boxSizing: 'border-box' }}
            >
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                width={safeItemWidth} // для Cypress
                height={safeItemWidth} // для Cypress
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button Carousel__button--prev"
        data-cy="prev"
        onClick={handlePrev}
        disabled={!infinite && currentIndex === 0}
      >
        Prev
      </button>

      <button
        className="Carousel__button Carousel__button--next"
        data-cy="next"
        onClick={handleNext}
        disabled={!infinite && currentIndex >= maxIndex}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
