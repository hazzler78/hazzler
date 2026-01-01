# Hazzler Landing Page

A modern, responsive landing page for the music artist Hazzler, built with React and Tailwind CSS.

## Features

- 🎨 Modern, sleek design with neon aesthetics
- 📱 Fully responsive layout
- ⚡ Built with React, TypeScript, and Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🔍 SEO optimized with structured data (JSON-LD)
- 🎵 Spotify integration (Hazzler & VOX artist profiles)
- ✅ Spotify Artist VOX verification ready
- 📺 Video gallery support (auto-updating with latest YouTube videos)
- 🔗 Social media integration
- 🎤 Artist metadata for verification (Mikael Söderberg)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment (Vercel Recommended)

1. Push your code to GitHub (see repository: https://github.com/hazzler78/hazzler.git)
2. Go to [Vercel](https://vercel.com/import/git) and import your repo.
3. Vercel will auto-detect your Vite/React setup and deploy your site.
4. For serverless functions, place your function files in the `/api` directory (see below).

## Serverless Function: Latest YouTube Videos

- The site uses a serverless function to fetch and display the three latest videos from your YouTube channel.
- The function fetches the RSS feed from your channel and returns the latest video IDs as JSON.
- The React app then displays these videos in the Video Gallery section.

### Example serverless function (Vercel):

Create `api/latest-youtube.js`:
```js
import { DOMParser } from '@xmldom/xmldom';

export default async function handler(req, res) {
  const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCnf8lvUfE1sABg_Nzy-byOg';
  const response = await fetch(feedUrl);
  const xml = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const entries = Array.from(doc.getElementsByTagName('entry')).slice(0, 3);

  const videos = entries.map(entry => {
    const link = entry.getElementsByTagName('link')[0].getAttribute('href');
    const videoId = link.split('v=')[1];
    return videoId;
  });

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ videos });
}
```

Install the dependency:
```bash
npm install @xmldom/xmldom
```

## Spotify Artist Verification

The site includes structured metadata for Spotify Artist VOX verification:

- **Artist Information**: Mikael Söderberg (founder)
- **Email**: hazzler@gmail.com (embedded in structured data to reduce spam)
- **Spotify Profiles**: 
  - Hazzler: `https://open.spotify.com/artist/2A3kRqveR7iDjFFnO8LYWq`
  - VOX: `https://open.spotify.com/artist/7yIOC0oTIb09TLevB2PJLl`
- **Structured Data**: JSON-LD schema.org MusicGroup format for search engines and Spotify crawlers

All metadata is configured in `index.html` and includes:
- Meta tags for artist information
- Schema.org structured data (JSON-LD)
- Social media links in `sameAs` array

## Customization

### Social Media Links

Update the following links in `src/App.tsx`:
- Spotify artist ID
- TikTok username
- Instagram username
- YouTube channel
- Patreon page
- Gumroad store

### Artist Metadata

Update artist information in `index.html`:
- Artist name and founder information
- Email address (in structured data)
- Additional Spotify artist profiles
- Social media links in the `sameAs` array

### Colors and Typography

The color scheme and typography can be customized in:
- `tailwind.config.js` for colors and font families
- `src/index.css` for custom components and animations

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT License

## About

**Hazzler** - Creating music daily with AI to awaken listeners spiritually and emotionally. Awaken through sound – the frequency of the future.

- Website: [hazzler.vercel.app](https://hazzler.vercel.app)
- GitHub: [hazzler78/hazzler](https://github.com/hazzler78/hazzler.git)
- Artist: Mikael Söderberg
- Spotify: [Hazzler](https://open.spotify.com/artist/2A3kRqveR7iDjFFnO8LYWq) | [VOX](https://open.spotify.com/artist/7yIOC0oTIb09TLevB2PJLl)
