import { useEffect, useState } from 'react';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import { EXTERNAL_REL, LINKS } from '../constants';

export default function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.55;
      setVisible(pastHero);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-3 mb-3 rounded-2xl border border-primary/35 bg-black/90 backdrop-blur-md p-2 shadow-[0_0_24px_rgba(0,207,255,0.25)] flex gap-2">
        <a
          href={LINKS.spotify}
          target="_blank"
          rel={EXTERNAL_REL}
          className="btn-primary flex-1 !px-3 !py-2.5 text-sm inline-flex items-center justify-center gap-1.5"
        >
          <MusicalNoteIcon className="w-4 h-4" />
          Spotify
        </a>
        <a
          href="#join"
          className="btn-secondary flex-1 !px-3 !py-2.5 text-sm inline-flex items-center justify-center"
        >
          Join list
        </a>
      </div>
    </div>
  );
}
