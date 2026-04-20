import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, ArrowRight } from 'lucide-react';

const FontInject = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700&family=JetBrains+Mono:wght@400;700&display=swap');
      
      .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
      .font-jet { font-family: 'JetBrains Mono', monospace; }
    `}
  </style>
);

const DOWNLOAD_LINK = "https://drive.usercontent.google.com/download?id=1bcsgBXzfm_7wPbAK4KfKxz0bn32XAOh2&export=download&authuser=0&confirm=t&uuid=cd4d267f-cae1-490c-84cd-3c505e8c15d0&at=ALBwUgkV2fwYDaz49g-R92nFqctH%3A1776705909451";

const GridBackground = () => (
  <div className="fixed inset-0 z-0 bg-black">
    <div 
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    />
    <div className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent" />
  </div>
);

const transitionConfig = { duration: 0.8, ease:[0.16, 1, 0.3, 1] };

const slideVariants = {
  enter: { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0, transition: transitionConfig },
  exit: { opacity: 0, y: -40, transition: transitionConfig }
};

const FeatureRow = ({ num, title, desc }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#222] group hover:bg-[#0a0a0a] transition-colors">
    <div className="flex items-center gap-8 mb-4 md:mb-0">
      <span className="font-jet text-[#555] text-lg">{num}</span>
      {}
      <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white font-grotesk">{title}</h3>
    </div>
    {}
    <p className="text-[#888] text-base md:text-xl max-w-lg md:text-right font-light font-grotesk">
      {desc}
    </p>
  </div>
);

const RawConsole = ({ isActive }) => {
  const [logs, setLogs] = useState([]);
  const sequence =[
    "init_core_module()",
    "bypassing_ring3_hooks...",
    "scanning_dwm_buffers[found: 0]",
    "dumping_registry_trace (UserAssist)",
    "analyzing_memory_regions...",
    "match_signature: 0x4F92A",
    "exporting_log.txt",
    "process_finished."
  ];

  useEffect(() => {
    if (isActive) {
      setLogs([]);
      sequence.forEach((line, i) => {
        setTimeout(() => {
          setLogs(prev =>[...prev, line]);
        }, i * 300 + 400);
      });
    }
  }, [isActive]);

  return (
    <div className="w-full bg-[#050505] border border-[#222] p-8 font-jet text-base h-80 overflow-hidden relative shadow-2xl">
      <div className="text-[#555] mb-6 border-b border-[#222] pb-4 flex justify-between tracking-widest text-sm">
        <span>terminal_output</span>
        <span>v.1.5.0</span>
      </div>
      <div className="flex flex-col gap-2 text-[#888]">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-6">
            <span className="text-[#333]">{(i + 1).toString().padStart(2, '0')}</span>
            <span className={log.includes("match_signature") ? "text-white bg-white/10 px-2" : ""}>
              {log}
            </span>
          </div>
        ))}
        {isActive && logs.length < sequence.length && (
          <motion.div animate={{ opacity:[1, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-2 h-5 bg-white mt-1" />
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [slide, setSlide] = useState(0);
  const isAnimating = useRef(false);
  const totalSlides = 3;

  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnimating.current) return;
      if (e.deltaY > 30 && slide < totalSlides - 1) {
        changeSlide(1);
      } else if (e.deltaY < -30 && slide > 0) {
        changeSlide(-1);
      }
    };

    const changeSlide = (dir) => {
      isAnimating.current = true;
      setSlide(prev => prev + dir);
      setTimeout(() => (isAnimating.current = false), 1000); 
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [slide]);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden selection:bg-white selection:text-black">
      <FontInject />
      <GridBackground />

      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 font-jet text-sm">
        {[0, 1, 2].map((num) => (
          <div 
            key={num} 
            className={`transition-colors duration-500 ${slide === num ? 'text-white scale-110' : 'text-[#333]'}`}
          >
            0{num + 1}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        
        {}
        {slide === 0 && (
          <motion.div key="slide0" variants={slideVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 flex flex-col justify-center px-12 md:px-32">
            <div className="relative z-10">
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-jet text-[#666] text-base uppercase tracking-widest mb-10">
                RaidCube // Forensic Tool
              </motion.div>

              {}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} 
                className="text-[5rem] md:text-[13rem] font-bold tracking-tighter leading-[0.8] mb-12 font-grotesk"
              >
                SYSTEM<br/>ANALYSIS.
              </motion.h1>

              {}
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} 
                className="text-[#888] max-w-2xl text-xl md:text-2xl font-light leading-relaxed mb-12 font-grotesk"
              >
                Ультимативный чекер. Выявление скрытых оверлеев, инжектов и удаленных файлов без следов в системе. Никакой магии, только сырые данные.
              </motion.p>
              
            </div>

            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-12 left-12 md:left-32 flex items-center gap-4 text-[#555] font-jet text-sm uppercase tracking-[0.2em]">
              <ArrowDown size={16} /> Scroll to initialize
            </motion.div>
          </motion.div>
        )}

        {}
        {slide === 1 && (
          <motion.div key="slide1" variants={slideVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 flex flex-col justify-center px-12 md:px-32">
            <div className="max-w-6xl w-full">
              
              <h2 className="text-base font-jet text-[#666] uppercase tracking-[0.3em] mb-16">
                Capabilities
              </h2>

              <div className="border-t border-[#222]">
                <FeatureRow 
                  num="01" 
                  title="OVERLAY DETECTION" 
                  desc="Анализ DWM-потоков. Обнаружение скрытых External слоев (Discord, Xbox)." 
                />
                <FeatureRow 
                  num="02" 
                  title="REGISTRY TRACE" 
                  desc="Глубокий дамп RecentDocs, Prefetch, AppCompatFlags. Чтение истории запусков." 
                />
                <FeatureRow 
                  num="03" 
                  title="MEMORY DUMP" 
                  desc="Поиск инжектов, хуков и подмен сертификатов драйверов в реальном времени." 
                />
              </div>

            </div>
          </motion.div>
        )}

        {}
        {slide === 2 && (
          <motion.div key="slide2" variants={slideVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 flex flex-col justify-center px-12 md:px-32">
            
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              
              <div>
                {}
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-grotesk leading-[0.9]">
                  READY TO EXECUTE.
                </h2>
                <p className="text-[#888] mb-14 font-light text-xl leading-relaxed font-grotesk">
                  Портативная версия 1.5.0. Запустите файл от имени администратора. Анализ занимает менее 10 секунд.
                </p>

                <div className="flex flex-col xl:flex-row gap-6">
                  {}
                  <a 
                    href={DOWNLOAD_LINK} 
                    className="group relative flex-1 flex items-center justify-between gap-8 bg-white text-black px-10 py-6 hover:bg-[#ccc] transition-colors"
                  >
                    <span className="font-bold uppercase tracking-[0.2em] text-base font-grotesk">Download .EXE</span>
                    <Download size={22} className="group-hover:translate-y-1 transition-transform" />
                  </a>

                  {}
                  <a 
                    href="https://discord.gg/vfKVd99msY" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group relative flex-1 flex items-center justify-between gap-8 border border-[#333] text-white px-10 py-6 hover:bg-white/5 transition-colors"
                  >
                    <span className="font-jet uppercase tracking-widest text-sm text-[#888] group-hover:text-white transition-colors">Join Discord</span>
                    <ArrowRight size={20} className="text-[#555] group-hover:-rotate-45 transition-transform" />
                  </a>
                </div>
              </div>

              {}
              <div className="hidden md:block">
                <RawConsole isActive={slide === 2} />
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}