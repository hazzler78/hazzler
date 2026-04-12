import { DOMParser } from '@xmldom/xmldom';

export default async function handler(req, res) {
  const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCnf8lvUfE1sABg_Nzy-byOg';

  try {
    const response = await fetch(feedUrl);
    const xml = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    const entries = Array.from(doc.getElementsByTagName('entry')).slice(0, 3);

    const videos = entries.map((entry) => {
      const link = entry.getElementsByTagName('link')[0].getAttribute('href');
      const videoId = link.split('v=')[1];

      const title = entry.getElementsByTagName('title')[0].textContent;
      const published = entry.getElementsByTagName('published')[0].textContent;

      // Construct high-quality thumbnail (no extra parsing needed)
      const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      return {
        id: videoId,
        title,
        published: new Date(published).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        thumbnail,
      };
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ videos });
  } catch (error) {
    console.error('YouTube RSS error:', error);
    res.status(200).json({ videos: [] }); // graceful fallback
  }
}
