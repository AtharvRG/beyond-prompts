import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, type MotionValue, type Transition } from 'motion/react';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
  children?: React.ReactNode;
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  children
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Centered Logo/Children */}
      <div className="absolute z-20 flex items-center justify-center pointer-events-none">
        {children}
      </div>

      <motion.div
        className="relative font-sans text-text-primary text-center cursor-pointer origin-center"
        style={{ 
          rotate: rotation,
        }}
        initial={{ rotate: 0 }}
        animate={controls}
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px]">
          {letters.map((letter, i) => {
            const rotationDeg = (360 / letters.length) * i;
            // Radius calculation for the circular path
            const radius = 100; // Increased radius for larger logo
            return (
              <span
                key={i}
                className="absolute inline-block left-1/2 top-1/2 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] transition-all duration-500 ease-[cubic-bezier(0,0,0,1)] whitespace-nowrap opacity-60"
                style={{ 
                  transformOrigin: '0 0',
                  transform: `rotate(${rotationDeg}deg) translateY(-${radius}px) translateX(-50%)`,
                  WebkitTransform: `rotate(${rotationDeg}deg) translateY(-${radius}px) translateX(-50%)`
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CircularText;
