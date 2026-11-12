import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, VolumeX, X } from 'lucide-react';
import { UserSettings, CursorState } from '../types';

interface ReelSectionProps {
  userSettings: UserSettings;
  setCursorState: (state: CursorState) => void;
}

export default function ReelSection({ userSettings, setCursorState }: ReelSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-10 max-w-7xl mx-auto">
      {/* Reel Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setModalOpen(true)}
        className="relative w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer group bg-black shadow-2xl border border-[#121212]/10"
        onMouseEnter={() => setCursorState({ variant: 'reel', text: 'PLAY' })}
        onMouseLeave={() => setCursorState({ variant: 'default' })}
      >
        {/* Background Looping Autoplay Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
        >
          <source src={userSettings.reelVideoUrl} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/60 transition-colors duration-500" />

        {/* Big Tracked-Out Uppercase Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#E31E24] group-hover:border-[#E31E24] transition-all duration-300 shadow-xl">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white tracking-[0.25em] uppercase drop-shadow-md">
              PLAY REEL
            </h2>
            <p className="font-sans-body text-xs sm:text-sm text-white/80 tracking-widest font-bold uppercase bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
              [ WATCH 2024–2026 HIGHLIGHTS ]
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* One-Line Supporting Caption Below Video */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-center font-sans-body text-xs sm:text-sm font-bold tracking-wider text-[#46516A] uppercase"
      >
        {userSettings.reelCaption}
      </motion.p>

      {/* Full-Screen Video Lightbox Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10"
          >
            <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-2xl">
              {/* Controls Header */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Video */}
              <video
                ref={modalVideoRef}
                autoPlay
                controls
                className="w-full h-full object-contain"
              >
                <source src={userSettings.reelVideoUrl} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
