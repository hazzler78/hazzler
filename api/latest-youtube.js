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