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
- 📺 Video gallery support
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

## Customization

### Social Media Links

Update the following links in `src/App.tsx`:
- Spotify artist ID
- TikTok username
- Instagram username
- YouTube channel
- Patreon page
- Gumroad store

### Spotify Embed

Replace `YOUR_TRACK_ID` in the Spotify iframe with your latest track ID.

### Video Gallery

Add your video embeds by replacing the YouTube iframe src with your video IDs.

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
