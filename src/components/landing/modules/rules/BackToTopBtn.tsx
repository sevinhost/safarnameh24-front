'use client';
import { useEffect, useState } from 'react';
import { ArrowRight2 } from 'iconsax-react';

// -----------------------------------------

export function BackToTopBtn() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`bg-zinc-200/50 px-3 flex-center rounded-lg transition-all duration-300 ease-in-out hover:bg-zinc-200/70 ${scrollY > 400 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowRight2 size={18} color="#52525b" className="-rotate-90" />
    </button>
  );
}
