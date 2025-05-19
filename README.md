# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Hazzler Landing Page

A modern, responsive landing page for the music artist Hazzler, built with React and Tailwind CSS.

## Features

- 🎨 Modern, sleek design with neon aesthetics
- 📱 Fully responsive layout
- ⚡ Built with React and Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🔍 SEO optimized
- 🎵 Spotify integration
- 📺 Video gallery support (auto-updating with latest YouTube videos)
- 🔗 Social media integration

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
import { DOMParser } from 'xmldom';

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
npm install xmldom
```

## Customization

### Social Media Links

Update the following links in `src/App.tsx`:
- Spotify artist ID
- TikTok username
- Instagram username
- YouTube channel
- Patreon page
- Gumroad store

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

MIT License - feel free to use this template for your own projects!
