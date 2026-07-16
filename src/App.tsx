import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  MusicalNoteIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

type YoutubeVideo = {
  id: string;
  title: string | null;
  published: string;
  thumbnail: string;
};

const sceneEase = [0.22, 1, 0.36, 1] as const;

function FilmScene({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 72, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.95, ease: sceneEase }}
    >
      {children}
    </motion.section>
  );
}

function SceneNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-2">
      <span className="font-audiowide text-5xl md:text-7xl text-white/10 leading-none select-none">
        {n}
      </span>
      <p className="scene-label mb-0">{label}</p>
    </div>
  );
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: pageProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });
  const progressScaleX = useSpring(pageProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const videoScale = useTransform(heroProgress, [0, 1], [1, 1.18]);
  const videoBrightnessFilter = useTransform(
    heroProgress,
    [0, 0.7],
    ['brightness(1)', 'brightness(0.55)'],
  );
  const titleY = useTransform(heroProgress, [0, 1], ['0%', '-35%']);
  const titleOpacity = useTransform(heroProgress, [0, 0.55], [1, 0]);
  const titleScale = useTransform(heroProgress, [0, 1], [1, 0.85]);
  const cueOpacity = useTransform(heroProgress, [0, 0.2], [1, 0]);

  const [videoData, setVideoData] = useState<YoutubeVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);

  useEffect(() => {
    fetch('/api/latest-youtube')
      .then((res) => res.json())
      .then((data) => setVideoData(data.videos || []))
      .catch(() => setVideoData([]))
      .finally(() => setVideosLoading(false));
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen overflow-x-hidden">
      {/* Film timeline progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-primary via-white to-secondary"
        style={{ scaleX: progressScaleX }}
        aria-hidden
      />

      {/* Opening scene — Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[110vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden letterbox"
      >
        <motion.video
          style={{
            y: videoY,
            scale: videoScale,
            filter: videoBrightnessFilter,
          }}
          className="absolute inset-x-0 -top-[12%] w-full h-[130%] object-cover opacity-60 pointer-events-none will-change-transform"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 film-vignette" />
        <div className="absolute inset-0 film-grain" />

        <motion.div
          className="relative z-10 max-w-4xl"
          style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
        >
          <motion.p
            className="scene-label"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.2, delay: 0.15 }}
          >
            Scene 01 — Enter the frequency
          </motion.p>
          <motion.h1
            className="font-audiowide text-6xl sm:text-7xl md:text-9xl mb-6 neon-text animate-neon-pulse"
            initial={{ opacity: 0, y: 40, scale: 1.08 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: sceneEase, delay: 0.25 }}
          >
            HAZZLER
          </motion.h1>
          <motion.p
            className="font-orbitron text-lg md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            Awaken through sound – the frequency of the future.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <a
              href="https://open.spotify.com/artist/2A3kRqveR7iDjFFnO8LYWq"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MusicalNoteIcon className="w-6 h-6" />
              Listen Now
            </a>
            <a href="#listen" className="btn-ghost inline-flex items-center gap-2">
              Press play
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
          style={{ opacity: cueOpacity }}
        >
          <span className="font-orbitron text-[10px] uppercase tracking-[0.4em]">
            Scroll the reel
          </span>
          <span className="animate-scroll-cue block h-8 w-px bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* Scene 02 — About as film title card */}
      <FilmScene className="relative py-28 md:py-36 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1020]/80 to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-14 items-center">
          <SceneNumber n="02" label="Origin story" />
          <div>
            <h2 className="section-title mb-6">Coded frequencies</h2>
            <p className="text-lg md:text-2xl text-white/85 leading-relaxed font-light">
              I&apos;m Hazzler – each day I create music with AI. Each song is a coded
              frequency designed to awaken and remind you of your true potential.
              Welcome to the journey.
            </p>
          </div>
        </div>
      </FilmScene>

      {/* Scene 03 — Listen / Spotify stage */}
      <FilmScene id="listen" className="relative py-24 md:py-32 px-4">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-3xl h-[70vw] max-h-[36rem] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <SceneNumber n="03" label="Now playing" />
          <h2 className="section-title">Latest Release</h2>
          <p className="text-white/70 mb-10 max-w-xl">
            Step into the soundstage — press play and let the reel keep rolling.
          </p>
          <motion.div
            className="rounded-xl overflow-hidden border border-primary/25 shadow-[0_0_60px_rgba(0,207,255,0.18)] bg-black/60"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <iframe
              src="https://open.spotify.com/embed/artist/2A3kRqveR7iDjFFnO8LYWq"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Hazzler on Spotify"
              className="w-full"
            />
          </motion.div>
        </div>
      </FilmScene>

      {/* Scene 04 — Film strip videos */}
      <FilmScene className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <SceneNumber n="04" label="Visual frequencies" />
          <h2 className="section-title">Latest Frequencies</h2>
          <p className="text-white/70 max-w-xl">
            A moving strip of signal — grab a frame and jump into the video.
          </p>
        </div>

        {videosLoading ? (
          <div className="text-center py-12 text-white/50 font-orbitron tracking-widest">
            Loading frames...
          </div>
        ) : videoData.length > 0 ? (
          <div className="flex gap-5 overflow-x-auto px-6 pb-6 snap-x snap-mandatory scrollbar-thin">
            {videoData.map((video, i) => (
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="film-card group snap-center shrink-0 w-[85vw] sm:w-[420px] rounded-2xl"
                initial={{ opacity: 0, x: 80, rotate: 2 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: sceneEase }}
                whileHover={{ y: -10 }}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title ?? ''}
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/25 transition-colors">
                    <div className="w-14 h-14 rounded-full border-2 border-white/90 flex items-center justify-center backdrop-blur-sm bg-black/30 group-hover:scale-110 transition-transform">
                      <PlayIcon className="w-7 h-7 text-white ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 font-orbitron text-[10px] tracking-[0.25em] text-black bg-primary/90 px-2 py-1">
                    TAKE {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 mb-2">
                    {video.title ?? 'Video'}
                  </h3>
                  <p className="text-primary/80 text-sm font-orbitron tracking-wide">
                    {video.published}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/50 px-6">
            <p className="text-xl">No videos yet — new frequencies dropping soon.</p>
          </div>
        )}
      </FilmScene>

      {/* Scene 05 — Community */}
      <FilmScene className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto md:flex md:items-end md:justify-between gap-12">
          <div className="max-w-xl">
            <SceneNumber n="05" label="Behind the curtain" />
            <h2 className="section-title">Join the Community</h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Support the journey and get exclusive content — early drops, unreleased
              frequencies, and the making-of.
            </p>
          </div>
          <a
            href="https://patreon.com/hazzler?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 shrink-0"
          >
            <UserGroupIcon className="w-6 h-6" />
            Join on Patreon
          </a>
        </div>
      </FilmScene>

      {/* Scene 06 — Merch */}
      <FilmScene className="relative py-24 md:py-32 px-4">
        <div className="max-w-5xl mx-auto border-l-2 border-secondary/70 pl-6 md:pl-10">
          <SceneNumber n="06" label="Merch reel" />
          <span className="coming-soon-badge mb-4">Coming Soon</span>
          <h2 className="section-title mt-4">Merch & Products</h2>
          <p className="text-lg mb-8 text-white/85 max-w-2xl leading-relaxed">
            The store is live — first products are landing soon. Bookmark it and be first
            in line for drops and limited runs.
          </p>
          <a
            href="https://hazzler.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            Visit the Store
          </a>
        </div>
      </FilmScene>

      {/* Scene 07 — DistroKid */}
      <FilmScene className="relative py-24 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SceneNumber n="07" label="Pass it forward" />
          <h2 className="section-title">Upload Your Own Music</h2>
          <p className="text-lg mb-8 text-white/85 max-w-2xl mx-auto leading-relaxed">
            Use my DistroKid affiliate link and get strong distribution for independent
            artists. Every signup helps fuel new tracks and future drops.
          </p>
          <a
            href="https://distrokid.com/vip/seven/7237992"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="w-6 h-6" />
            Upload with My Link
          </a>
        </div>
      </FilmScene>

      {/* End credits */}
      <footer className="relative py-16 px-4 border-t border-white/10">
        <div className="absolute inset-0 film-grain opacity-[0.04]" />
        <div className="relative max-w-4xl mx-auto">
          <p className="scene-label text-center mb-8">End credits</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.tiktok.com/@hazzler"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors hover:scale-110"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hazzlermusic/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCnf8lvUfE1sABg_Nzy-byOg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors hover:scale-110"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href="https://open.spotify.com/artist/2A3kRqveR7iDjFFnO8LYWq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors hover:scale-110"
              aria-label="Spotify"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </a>
          </div>
          <p className="text-center text-white/50 mt-8">
            <a href="/terms.html" className="text-white/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
            {' · '}
            <a href="/privacy.html" className="text-white/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </p>
          <p className="text-center text-white/40 mt-2 font-orbitron text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Hazzler · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
