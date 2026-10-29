import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon } from '@heroicons/react/24/solid';
import {
  MusicalNoteIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ArrowUpTrayIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/outline';
import Nav from './components/Nav';
import EmailSignup from './components/EmailSignup';
import MobileStickyCta from './components/MobileStickyCta';
import { AFFILIATE_REL, EXTERNAL_REL, LINKS } from './constants';

type YoutubeVideo = {
  id: string;
  title: string | null;
  published: string;
  thumbnail: string;
};

function App() {
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
    <div className="min-h-screen bg-black pb-20 md:pb-0">
      <Nav />

      {/* Hero */}
      <section
        id="home"
        className="min-h-[100svh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-24 relative overflow-hidden"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40 brightness-90 pointer-events-none"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black pointer-events-none" />

        <motion.div
          className="relative z-10 w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-audiowide text-6xl md:text-8xl mb-4 neon-text animate-neon-pulse">
            HAZZLER
          </h1>
          <p className="font-orbitron text-lg md:text-2xl mb-3 text-white/95 leading-snug">
            Swedish deep house &amp; electronic pop — press play and feel it.
          </p>
          <p className="text-sm md:text-base text-white/60 mb-8 tracking-wide">
            Independent artist from Sweden · Deep house · Electronic pop
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-2">
            <a
              href={LINKS.spotify}
              target="_blank"
              rel={EXTERNAL_REL}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <MusicalNoteIcon className="w-6 h-6" />
              Listen on Spotify
            </a>
            <a
              href="#videos"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <PlayCircleIcon className="w-6 h-6" />
              Watch Videos
            </a>
          </div>

          <EmailSignup variant="hero" />
        </motion.div>
      </section>

      {/* Latest Release — high on page for conversion */}
      <section id="music" className="py-16 md:py-20 px-4 bg-black relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-orbitron text-xs uppercase tracking-[0.22em] text-primary/80 mb-3">
              Stream now
            </p>
            <h2 className="section-title mb-3">Latest Release</h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Hit play — the newest Hazzler frequencies are live on Spotify.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-primary/25 shadow-[0_0_40px_rgba(0,207,255,0.15)] bg-black/50">
            <iframe
              src={LINKS.spotifyEmbed}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Hazzler on Spotify"
              className="rounded-2xl w-full"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href={LINKS.spotify}
              target="_blank"
              rel={EXTERNAL_REL}
              className="btn-primary inline-flex items-center gap-2"
            >
              <MusicalNoteIcon className="w-5 h-5" />
              Open full catalog on Spotify
            </a>
          </div>
        </div>
      </section>

      {/* About + email capture */}
      <section id="about" className="py-16 md:py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="font-orbitron text-xs uppercase tracking-[0.22em] text-primary/80 mb-3">
              The artist
            </p>
            <h2 className="section-title mb-0">About</h2>
          </div>
          <p className="text-lg md:text-xl text-center text-white/90 leading-relaxed mb-6">
            I&apos;m Hazzler — a Swedish artist making deep house and electronic pop, built with AI
            and finished by hand. Every track is a frequency meant to lift you up and remind you of
            your true potential. Welcome to the journey.
          </p>
          <blockquote className="text-center max-w-2xl mx-auto mb-10 border-l-2 border-primary/50 pl-4 md:pl-6">
            <p className="font-orbitron text-base md:text-lg text-primary/90 italic leading-relaxed">
              “Music isn&apos;t entertainment — it&apos;s a transmission.”
            </p>
          </blockquote>
          <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs md:text-sm font-orbitron uppercase tracking-wider text-white/55">
            <span className="px-3 py-1.5 rounded-full border border-white/15">Deep house · Electronic pop</span>
            <span className="px-3 py-1.5 rounded-full border border-white/15">Independent · Sweden</span>
            <span className="px-3 py-1.5 rounded-full border border-white/15">Spotify · YouTube · TikTok</span>
          </div>
          <EmailSignup variant="section" id="join" />
        </div>
      </section>

      {/* Video Gallery */}
      <section id="videos" className="py-16 md:py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-12">
            <p className="font-orbitron text-xs uppercase tracking-[0.22em] text-primary/80 mb-3">
              Visual transmissions
            </p>
            <h2 className="section-title mb-3">Latest Frequencies</h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Fresh visuals from the lab — tap in and watch on YouTube.
            </p>
          </div>

          {videosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" aria-busy="true" aria-label="Loading videos">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-2xl border border-cyan-400/20 bg-black/50 overflow-hidden animate-pulse">
                  <div className="w-full aspect-video bg-white/5" />
                  <div className="p-5 md:p-6 space-y-3">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : videoData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {videoData.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel={EXTERNAL_REL}
                  className="group relative block overflow-hidden rounded-2xl border border-cyan-400/30 bg-black/50 hover:border-cyan-400 hover:shadow-[0_0_28px_rgba(0,207,255,0.25)] transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title ?? 'Hazzler video'}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = video.thumbnail;
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 group-hover:bg-black/25 transition-colors">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-primary bg-black/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,207,255,0.45)] group-hover:scale-110 transition-transform">
                        <PlayIcon className="w-7 h-7 md:w-8 md:h-8 text-primary ml-0.5" />
                      </div>
                      <span className="font-orbitron text-[11px] md:text-xs uppercase tracking-[0.18em] text-white bg-black/55 border border-primary/40 px-3 py-1.5 rounded-full opacity-90 group-hover:opacity-100">
                        Watch on YouTube
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="text-white font-semibold text-base md:text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                      {video.title ?? 'Video'}
                    </h3>
                    <p className="text-cyan-300/80 text-sm">{video.published}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 rounded-2xl border border-white/10 bg-black/40">
              <p className="font-orbitron text-lg text-white/80 mb-2">Videos are on YouTube</p>
              <p className="text-white/55">Couldn&apos;t load the latest videos here — catch them all on the channel.</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <a
              href={LINKS.youtube}
              target="_blank"
              rel={EXTERNAL_REL}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <PlayCircleIcon className="w-5 h-5" />
              More on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 md:py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-orbitron text-xs uppercase tracking-[0.22em] text-primary/80 mb-3">
            Inner circle
          </p>
          <h2 className="section-title mb-3">Join the Community</h2>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Support the journey and unlock exclusive behind-the-scenes frequencies.
          </p>
          <a
            href={LINKS.patreon}
            target="_blank"
            rel={EXTERNAL_REL}
            className="btn-primary inline-flex items-center gap-2"
          >
            <UserGroupIcon className="w-6 h-6" />
            Join on Patreon
          </a>
        </div>
      </section>

      {/* Merch */}
      <section className="py-16 md:py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent px-6 py-10 md:px-12 shadow-[0_0_40px_rgba(0,207,255,0.08)]">
            <span className="coming-soon-badge mb-4">Coming Soon</span>
            <h2 className="section-title mb-3">Merch &amp; Products</h2>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
              The Hazzler store is open and the first drops are on the way. Follow along to be first
              in line for limited runs.
            </p>
          <a
            href={LINKS.gumroad}
            target="_blank"
            rel={EXTERNAL_REL}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            Visit the Store
          </a>
          </div>
        </div>
      </section>

      {/* DistroKid */}
      <section className="py-16 md:py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-orbitron text-xs uppercase tracking-[0.22em] text-primary/80 mb-3">
            For artists
          </p>
          <h2 className="section-title mb-3">Release Your Own Music</h2>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Hazzler releases through DistroKid. Signing up with my link supports new tracks at no extra
            cost to you.
          </p>
          <a
            href={LINKS.distrokid}
            target="_blank"
            rel={AFFILIATE_REL}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="w-6 h-6" />
            Try DistroKid
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-black/90 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-7 mb-6">
            <a
              href={LINKS.tiktok}
              target="_blank"
              rel={EXTERNAL_REL}
              className="text-white/70 hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel={EXTERNAL_REL}
              className="text-white/70 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href={LINKS.youtube}
              target="_blank"
              rel={EXTERNAL_REL}
              className="text-white/70 hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href={LINKS.spotify}
              target="_blank"
              rel={EXTERNAL_REL}
              className="text-white/70 hover:text-primary transition-colors"
              aria-label="Spotify"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </a>
          </div>
          <p className="text-center text-white/50 text-sm">
            <a href="/terms.html" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            {' · '}
            <a href="/privacy.html" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
          </p>
          <p className="text-center text-white/40 text-sm mt-2">
            © {Math.max(new Date().getFullYear(), 2026)} Hazzler. All rights reserved.
          </p>
        </div>
      </footer>

      <MobileStickyCta />
    </div>
  );
}

export default App;
