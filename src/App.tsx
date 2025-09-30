import React, { useState, useEffect } from 'react';
import './App.scss';
import Carousel from './components/Carousel';

const App: React.FC = () => {
  const images = [
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/7.png',
    './img/8.png',
    './img/9.png',
    './img/10.png',
  ];

  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setStep] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(1000);

  useEffect(() => {
    document.title = `Carousel — ${images.length} images`;
  }, [images.length]);

  const handleItemWidthChange = (value: string) => {
    const v = Number(value);

    setItemWidth(Number.isFinite(v) && v > 0 ? v : 130);
  };

  const handleFrameSizeChange = (value: string) => {
    const v = Number(value);

    setFrameSize(Number.isFinite(v) && v > 0 ? Math.min(v, images.length) : 3);
  };

  const handleStepChange = (value: string) => {
    const v = Number(value);

    setStep(Number.isFinite(v) && v > 0 ? Math.min(v, images.length) : 3);
  };

  const handleDurationChange = (value: string) => {
    const v = Number(value);

    setAnimationDuration(Number.isFinite(v) && v >= 0 ? v : 1000);
  };

  return (
    <div className="App">
      <h1 data-cy="title">Carousel with {images.length} images</h1>

      <div className="controls">
        <div className="controls__group">
          <label htmlFor="itemId">Item width:</label>
          <input
            id="itemId"
            type="number"
            min={1}
            value={itemWidth}
            onChange={e => handleItemWidthChange(e.target.value)}
          />
        </div>

        <div className="controls__group">
          <label htmlFor="frameId">Frame size:</label>
          <input
            id="frameId"
            type="number"
            min={1}
            max={images.length}
            value={frameSize}
            onChange={e => handleFrameSizeChange(e.target.value)}
          />
        </div>

        <div className="controls__group">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            min={1}
            max={images.length}
            value={step}
            onChange={e => handleStepChange(e.target.value)}
          />
        </div>

        <div className="controls__group">
          <label htmlFor="durationId">Animation duration:</label>
          <input
            id="durationId"
            type="number"
            min={0}
            value={animationDuration}
            onChange={e => handleDurationChange(e.target.value)}
          />
        </div>
      </div>

      <Carousel
        images={images}
        itemWidth={itemWidth}
        frameSize={frameSize}
        step={step}
        animationDuration={animationDuration}
        infinite={false}
      />
    </div>
  );
};

export default App;
