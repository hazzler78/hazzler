import { motion } from 'framer-motion';
import { 
  MusicalNoteIcon, 
  UserGroupIcon, 
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';

function App() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm brightness-75 pointer-events-none"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <motion.div className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-audiowide text-6xl md:text-8xl mb-6 neon-text animate-neon-pulse">
            HAZZLER
          </h1>
          <p className="font-orbitron text-xl md:text-2xl mb-12 text-white/90">
            Awaken through sound – the frequency of the future.
          </p>
          <a
            href="https://open.spotify.com/artist/2A3kRqveR7iDjFFnO8LYWq"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <MusicalNoteIcon className="w-6 h-6" />
            Listen Now
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">About</h2>
          <p className="text-lg md:text-xl text-center text-white/90 leading-relaxed">
            I'm Hazzler – each day I create music with AI. Each song is a coded frequency 
            designed to awaken and remind you of your true potential. Welcome to the journey.
          </p>
        </div>
      </section>

      {/* Latest Release Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">Latest Release</h2>
          <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
            {/* Replace with actual Spotify embed */}
            <iframe
              src="https://open.spotify.com/embed/artist/2A3kRqveR7iDjFFnO8LYWq"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center">Video Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Replace with actual video embeds */}
            <div className="aspect-video bg-black/50 rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            {/* Add more video embeds as needed */}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Join the Community</h2>
          <p className="text-lg mb-8 text-white/90">
            Support the journey and get exclusive content
          </p>
          <a
            href="https://patreon.com/YOUR_PATREON"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <UserGroupIcon className="w-6 h-6" />
            Join on Patreon
          </a>
        </div>
      </section>

      {/* Merch Section */}
      <section className="py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Merch & Products</h2>
          <p className="text-lg mb-8 text-white/90">
            Get your hands on exclusive Hazzler merchandise
          </p>
          <a
            href="https://gumroad.com/YOUR_GUMROAD"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            Shop Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/80">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.tiktok.com/@hazzler"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/YOUR_INSTAGRAM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCnf8lvUfE1sABg_Nzy-byOg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a
              href="https://open.spotify.com/artist/YOUR_SPOTIFY_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
          </div>
          <p className="text-center text-white/50 mt-8">
            © {new Date().getFullYear()} Hazzler. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
