import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Sparkles } from 'lucide-react';

const FloatingHeart = ({ delay, left, size }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${left}%`, top: '-50px' }}
    initial={{ y: -50, opacity: 0, rotate: 0 }}
    animate={{ 
      y: '110vh', 
      opacity: [0, 1, 1, 0],
      rotate: [0, 15, -15, 0]
    }}
    transition={{ 
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <span style={{ fontSize: size }}>{['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}</span>
  </motion.div>
);

const Confetti = ({ delay, left }) => {
  const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6eb4', '#fff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute w-3 h-3 pointer-events-none"
      style={{ 
        left: `${left}%`, 
        top: '-20px',
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '0%'
      }}
      initial={{ y: -20, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ 
        y: '110vh', 
        opacity: [1, 1, 0],
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        x: (Math.random() - 0.5) * 200
      }}
      transition={{ 
        duration: 3 + Math.random() * 2,
        delay,
        ease: 'linear'
      }}
    />
  );
};

const FallingHeart = ({ delay, left }) => (
  <motion.div
    className="absolute pointer-events-none text-4xl"
    style={{ left: `${left}%`, top: '-50px' }}
    initial={{ y: -50, opacity: 1, rotate: 0 }}
    animate={{ 
      y: '110vh', 
      rotate: [0, 20, -20, 0],
      scale: [1, 1.2, 1]
    }}
    transition={{ 
      duration: 3 + Math.random() * 2,
      delay,
      ease: 'linear'
    }}
  >
    {['❤️', '💖', '💕', '💗', '💝', '🥰', '😍'][Math.floor(Math.random() * 7)]}
  </motion.div>
);

const DancingPerson = ({ emoji, delay }) => (
  <motion.div
    className="text-6xl md:text-8xl"
    animate={{ 
      y: [0, -20, 0],
      rotate: [-5, 5, -5],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 0.5,
      delay,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    {emoji}
  </motion.div>
);

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noMessage, setNoMessage] = useState('Non');
  const [noHoverCount, setNoHoverCount] = useState(0);
  const containerRef = useRef(null);

  const noMessages = [
    'Tu es sûr(e) ?',
    'Réfléchis bien...',
    'Tu me brises le cœur 💔',
    'Vraiment ?! 😢',
    'Donne-moi une chance !',
    'Mon cœur saigne... 💔',
    'Noooon pitié !',
    'Je vais pleurer 😭',
    'Reconsidère stp !',
    'Tu es cruel(le) ! 💔'
  ];

  const moveNoButton = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const maxX = container.width - 150;
      const maxY = container.height - 60;
      
      const newX = Math.random() * maxX - maxX / 2;
      const newY = Math.random() * maxY - maxY / 2;
      
      setNoButtonPos({ x: newX, y: newY });
      setNoHoverCount(prev => prev + 1);
      setNoMessage(noMessages[noHoverCount % noMessages.length]);
    }
  };

  // Decorative elements positions
  const decorations = [
    { emoji: '🌹', top: '5%', left: '5%', size: '3rem' },
    { emoji: '🌸', top: '10%', right: '8%', size: '2.5rem' },
    { emoji: '💐', bottom: '15%', left: '3%', size: '3rem' },
    { emoji: '🌺', top: '30%', right: '5%', size: '2rem' },
    { emoji: '🌷', bottom: '25%', right: '10%', size: '2.5rem' },
    { emoji: '💮', top: '50%', left: '2%', size: '2rem' },
    { emoji: '🏵️', bottom: '5%', right: '5%', size: '2.5rem' },
    { emoji: '❤️', top: '15%', left: '15%', size: '2rem' },
    { emoji: '💕', top: '25%', right: '15%', size: '1.8rem' },
    { emoji: '💖', bottom: '30%', left: '10%', size: '2rem' },
    { emoji: '💗', top: '60%', right: '3%', size: '2.2rem' },
    { emoji: '💝', bottom: '10%', left: '15%', size: '2rem' },
  ];

  return (
    <div 
      ref__={containerRef}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 25%, #dc3545 50%, #c82333 75%, #a71d2a 100%)'
      }}
    >
      {/* Floating hearts background */}
      {!accepted && [...Array(12)].map((_, i) => (
        <FloatingHeart 
          key={i} 
          delay={i * 0.5} 
          left={Math.random() * 100}
          size={`${1.5 + Math.random() * 2}rem`}
        />
      ))}

      {/* Decorative stickers */}
      {decorations.map((dec, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ 
            ...dec,
            fontSize: dec.size
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {dec.emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10"
          >
            {/* Title */}
            <motion.div
              className="text-center mb-12"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', bounce: 0.5 }}
            >
              <motion.div
                className="flex justify-center mb-6"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-8xl">🧸</span>
              </motion.div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
                Est-ce que tu veux être
                <br />
                <span className="text-pink-200">en couple avec moi ?</span>
              </h1>
              
              <motion.div
                className="flex justify-center gap-2 mt-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-3xl">🥺</span>
                <span className="text-3xl">👉</span>
                <span className="text-3xl">👈</span>
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-center relative">
              {/* Yes button */}
              <motion.button
                onClick={() => setAccepted(true)}
                className="px-12 py-6 bg-green-500 hover:bg-green-400 text-white text-2xl md:text-3xl font-bold rounded-2xl shadow-2xl border-4 border-green-300"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ['0 0 20px rgba(34,197,94,0.5)', '0 0 40px rgba(34,197,94,0.8)', '0 0 20px rgba(34,197,94,0.5)']
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                OUI 💚
              </motion.button>

              {/* No button that escapes */}
              <motion.button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="px-12 py-6 bg-red-600 hover:bg-red-500 text-white text-2xl md:text-3xl font-bold rounded-2xl shadow-2xl border-4 border-red-400"
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ scale: 0.9 }}
              >
                {noMessage}
              </motion.button>
            </div>

            {noHoverCount > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-white/80 text-lg"
              >
                {noHoverCount > 3 ? "Allez, dis oui ! 🥺💕" : "Héhé, tu ne peux pas cliquer ! 😏"}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 relative z-10"
          >
            {/* Confetti rain */}
            {[...Array(50)].map((_, i) => (
              <Confetti key={`confetti-${i}`} delay={i * 0.05} left={Math.random() * 100} />
            ))}
            
            {/* Hearts rain */}
            {[...Array(30)].map((_, i) => (
              <FallingHeart key={`heart-${i}`} delay={i * 0.1} left={Math.random() * 100} />
            ))}

            {/* YESSSSS text */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.6 }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-9xl font-black text-white drop-shadow-2xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 60px rgba(255,255,255,0.8)',
                    '0 0 20px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                YESSSSSSS!!!
              </motion.h1>
              
              <motion.div
                className="flex justify-center gap-4 mt-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-5xl">💖</span>
                <span className="text-5xl">💕</span>
                <span className="text-5xl">💗</span>
                <span className="text-5xl">💝</span>
                <span className="text-5xl">💖</span>
              </motion.div>
            </motion.div>

            {/* Dancing people */}
            <motion.div
              className="flex gap-4 md:gap-8 mt-8 flex-wrap justify-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <DancingPerson emoji="🕺" delay={0} />
              <DancingPerson emoji="💃" delay={0.1} />
              <DancingPerson emoji="🥳" delay={0.2} />
              <DancingPerson emoji="😍" delay={0.3} />
              <DancingPerson emoji="🤩" delay={0.4} />
            </motion.div>

            {/* Happy person GIFs */}
            <motion.div
              className="flex gap-6 mt-8 flex-wrap justify-center items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <motion.img
                src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
                alt="Happy dancing"
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.img
                src="https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif"
                alt="Celebrating"
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.img
                src="https://media.giphy.com/media/g9582DNuQppxC/giphy.gif"
                alt="Dancing happy"
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
            </motion.div>

            {/* Love message */}
            <motion.div
              className="mt-10 flex items-center gap-4 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-2xl md:text-4xl text-white font-bold text-center">
                Je t'aime de tout mon cœur aşkım
              </p>
              <motion.span
                className="text-5xl"
                animate={{ 
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                💗
              </motion.span>
            </motion.div>

            {/* More dancing emojis at the bottom */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-center gap-4"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {['🕺', '💃', '🕺', '💃', '🕺'].map((emoji, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: i % 2 === 0 ? [-10, 10, -10] : [10, -10, 10]
                  }}
                  transition={{ 
                    duration: 0.4,
                    delay: i * 0.1,
                    repeat: Infinity
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
