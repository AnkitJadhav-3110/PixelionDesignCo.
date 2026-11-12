import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CursorState } from '../types';

interface CustomCursorProps {
  cursorState: CursorState;
}

export default function CustomCursor({ cursorState }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isExpanded = cursorState.variant !== 'default';
  const hasText = !!cursorState.text;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Ring / Sphere expansion */}
      <motion.div
        className={`fixed left-0 top-0 rounded-full flex items-center justify-center font-sans-body font-medium transition-colors duration-200 ${
          cursorState.variant === 'project' || cursorState.variant === 'reel'
            ? 'bg-[#2C3D6C] text-[#FDFEFE] shadow-2xl border border-white/20'
            : cursorState.variant === 'copy'
            ? 'bg-[#E31E24] text-white shadow-lg'
            : cursorState.variant === 'hover'
            ? 'bg-[#E31E24] text-white'
            : 'bg-[#E31E24] border border-white/30 shadow-md'
        }`}
        animate={{
          x: mousePosition.x - (isExpanded ? (hasText ? 44 : 28) : 8),
          y: mousePosition.y - (isExpanded ? (hasText ? 44 : 28) : 8),
          width: isExpanded ? (hasText ? 88 : 56) : 16,
          height: isExpanded ? (hasText ? 88 : 56) : 16,
          scale: isExpanded ? 1 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.5,
        }}
      >
        <AnimatePresence mode="wait">
          {cursorState.text && (
            <motion.span
              key={cursorState.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] tracking-widest font-bold uppercase text-center leading-none px-2 select-none"
            >
              {cursorState.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
