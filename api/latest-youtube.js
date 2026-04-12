import { DOMParser } from '@xmldom/xmldom';

export default async function handler(req, res) {
  const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCnf8lvUfE1sABg_Nzy-byOg';

  try {
    const response = await fetch(feedUrl);
    const xml = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    const entries = Array.from(doc.getElementsByTagName('entry')).slice(0, 3);

    const videos = entries
      .map((entry) => {
        const linkEl = entry.getElementsByTagName('link')[0];
        const href = linkEl ? linkEl.getAttribute('href') : '';
        const fromQuery = href.match(/[?&]v=([^&]+)/);
        const ytIdEl = entry.getElementsByTagName('yt:videoId')[0];
        const videoId =
          (ytIdEl && ytIdEl.textContent && ytIdEl.textContent.trim()) ||
          (fromQuery && fromQuery[1]);

        if (!videoId) return null;

        const titleEl = entry.getElementsByTagName('title')[0];
        const publishedEl = entry.getElementsByTagName('published')[0];
        const title = titleEl ? titleEl.textContent : null;
        const published = publishedEl ? publishedEl.textContent : null;

        const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        return {
          id: videoId,
          title,
          published: published
            ? new Date(published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : '',
          thumbnail,
        };
      })
      .filter(Boolean);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ videos });
  } catch (error) {
    console.error('YouTube RSS error:', error);
    res.status(200).json({ videos: [] });
  }
}
